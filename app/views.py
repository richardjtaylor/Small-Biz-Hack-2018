import uuid, os, re
from datetime import datetime
from flask import render_template, request, redirect, jsonify
from app.exceptions import InvalidInput
from app.models import Chat, ChatMessage, Estimate, EstimateItem, ImageTag
from app.schema import chat_schema, chat_message_schema, chat_messages_schema, estimate_schema, estimate_item_schema
from app.enums import MessageType
from app import app, db, socketio
import nexmo
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

IMAGES = ["http://loremflickr.com/320/240/dog","http://loremflickr.com/320/240/dog","http://loremflickr.com/320/240/dog","http://loremflickr.com/320/240/dog"]

@app.errorhandler(InvalidInput)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


def parse_json(request):
    json_data = request.get_json()
    if not json_data:
        return jsonify({'message': 'No input data provided'}), 400
    else:
        return json_data


@app.route('/message', methods=['POST'])
def receive_message():
    if request.is_json:
        json_body = request.get_json()
        #socketio.emit('receive_message', json_body)
        chat_text = json_body.get('text', '')

        chat_id = 'f4c9e67c-fa38-4114-b2dc-4a04f3a70193'
        chat_message = create_chat_message(chat_id, False, 0, chat_text)
        socketio.emit('receive_message', chat_message_schema.dump(chat_message))
    return ('', 204)


# {
#     "msisdn":"16139211286",
#     "to":"12262403107",
#     "messageId":"0B000002420565BA",
#     "text":"Hahaha",
#     "type":"text",
#     "keyword":"HAHAHA",
#     "message-timestamp":"2018-12-02 04:28:21"
# }





@app.route('/all_messages', methods=['GET'])
def return_all_messages():
    messages = db.session.query(ChatMessage).all() #filter(ChatMessage.chat_id==chat_id)
    
    return chat_messages_schema.jsonify(messages)


@socketio.on('send_message')
def send_message(json):
    text_body = json.get('text_body', '')
    chat_id = json.get('chat_id', '')
    chat_type = json.get('type', 0)

    client = nexmo.Client(key='c6b89e5c', secret='NiwYj5KhU1ycZFTw')
    client.send_message({
        'from': '12262403107',
        'to': '16139211286',
        #'to': '14167096814',
        'text': text_body,
    })

    chat_message = create_chat_message(chat_id, True, chat_type, text_body)
    socketio.emit('receive_message', chat_message_schema.dump(chat_message))



def create_chat_message(chat_id, sent_from_self, chat_type, text_body):
    
    # Create chat message
    chat_message = ChatMessage(chat_id=chat_id, sent_from_self=sent_from_self, type=chat_type, text_body=text_body)
    db.session.add(chat_message)

    # Flush...?
    db.session.flush()



    # # If the message is an image, save the tags above a threshold
    threshold_value = 0.95
    
    try:
        # # temporary while we have no images, set to text
        if (text_body.find('faucet') > -1):
            img = 'https://i.ytimg.com/vi/JaXLnBsswuM/maxresdefault.jpg'
            response = predict_image(img)
            chat_message.type = 1
            chat_message.text_body = img
            #socketio.emit('receive_images', )
        elif ('keyword2' in text_body):
            response = predict_image('https://public.boxcloud.com/api/2.0/internal_files/360359850255/versions/380887063455/representations/jpg_paged_2048x2048/content/1.jpg?access_token=1!E613Lu64PJAAs1PIcDRKD9LhYBC09LPTsWTZN-_O3u2ZiqllQDXIvxlUYiDzcTwHIvHEdoVQWoJ0KbD1iogN_TAVU_L-u64haQ8nsI5CfYyJ2s7HNN0uwqqC6iMlNEm3BFtLQXpbqKYsFL90BQuUJtEHrvhsYEqlJPFM1dwNF-GoXblT44ozisZascnhXauv4Md-7WmyF7CeI3yr52Tx0auH5bZvcCOVaL5YiqdpoECL7CHTmFwjviFGHjnrIKcI2YdDq_xB6yHkAx_-xQ-5JJral1CXThArLLtmezS7d4gJx-kotbIQs0pxf2zPek4E4B0k9wyH33LIr6WXTbpCchSSATLH66jZdGw713JdR7gglERULx2N7K5_a7ts5Jym-IHWK_lHuID_-2T7p-nZfuRKl7wRjieUmT-jzUkj4off-KQK50P8gJAk1ie2vn4bhb-Hd8A3MfWP4YrF-3Uhl8eQ84x8HYrEmhV2jdAi8rQYi_d_HPGdU1pk5vn2sFNfI0J4Q8yLSbXqeEbxZV40lIq7HSzCe39lX1BDgqHRstEiOaw3AqW9BySZP43-6DpCbA..&box_client_name=box-content-preview&box_client_version=1.58.3')
        elif ('keyword3' in text_body):
            response = predict_image('https://public.boxcloud.com/api/2.0/internal_files/360354805906/versions/380881649506/representations/jpg_paged_2048x2048/content/1.jpg?access_token=1!b3vHOkPPU3NqKvvthauaIhKPNOZdHWuFteeK_GKSBAMPEny4loNT-_pISpHVSm6DO6VnEvgZZVAz2osA1Lyq662rWVIiE9Wp3UjnLBa3d8y0HFtS6M4V8aDnHz7mOiRd19GlOP81GR6RA0Nz00DifTdzPYGYjLYfvBum4z53TpwAM-ZSUCXPf45JWWwZ8BksQOxucBdb1CMsPSLARr_l-zW7zYKpcvd-dpo38Cw1I2T4HYJXrNmlhMuolCo-mSegAqHuwp40q_qw-YrZejbJ1NpjA5b-2OJtMxhhijNjSunZnRxk1BESkilIVM0wDzEn5pnFhPuHWoKoSxvcYUp7fHt4L_rnKt5sRdX5hnjM6OjnsGjNYMyYiig0bY4tH6dWOWeUAaSYce4tl7yFioHoNw9nrd0Ja4hKkhxXs4gRVpO8BuCz_mDenTJ7KDzYNhodQHveqv5zDF9w4T7MIcQoV-eWMZkd9UNiIKvg4ne34tpA4qIeQj8H6SEA2KwE03DlnreU93kXlKclbvT7Y56NKKomqK3Lnx56UP9yC0ylYTyiGHYLAoCxeX8aygvq1vQa1Q..&box_client_name=box-content-preview&box_client_version=1.58.3')
        else:
            response = predict_image('https://public.boxcloud.com/api/2.0/internal_files/360355449730/versions/380882352130/representations/jpg_paged_2048x2048/content/1.jpg?access_token=1!31OZja_06R-QBIveNEBh00Re2zvohDPiBOasPwd7LS1altmXBVT0cYvsfu8Hh9D3JTRIsOErodJSbrytHuPxhPE2ej9gid9RWtF7WsxYgiZvM3NHLVRxLdgX9_DUveYd5gCNKkjfaeW2JDEm-AY3FzNa0KoOwuEkhWTAzLXW1RILz1GUeziFr7NfOR5WFyVVK5T9HWw4MRFGvhhQyHzZppU87fuhlJTnZqXFJHaj-KRMT0VOm4HGmbP-LlN9U32p_Hk1lyA3EATSFt9E8FZr5Utf5_0SzlIK9gQlvNdRm8j9v7Y7ShGz4N2A_M7wOeNgXkig3qunpFKq17zZdsBiWNnCt5DpdWU1L6CP2A-4dzQ_7ZAeBAAgjREDmhZM_61STZlq4SP0qakUTMU0QVu3axcFWpas0kzzRqNVZzuK5rF8bvBlZ4t4TzZ2yQF2jGslIgMZ_gt2ChkOLpo1FhxnZl5d-Zcmb3WO3sRHieTvT0Dgq90zc1NEXrgNBO7p82Jqe7AhLY7-_ZeBzCq_ou-nYVnmn2PhYQkk3DUcyJyNSJVDuu4lgP2uvXjIcnPue_lU8A..&box_client_name=box-content-preview&box_client_version=1.58.3')

        output_list = response.get('outputs')[0].get('data').get('concepts')
        for output in output_list:
            if (output.get('value') >= threshold_value):
                create_image_tag(chat_message.id, output.get('name'))
    except:
        print('>>>>>>>>>>>>>>>>>>>>>ERROR')


    # Commit to db
    db.session.commit()
    return chat_message



def create_image_tag(chat_message_id, tag_name):
    
    # Create image tag
    image_tag = ImageTag(chat_message_id=chat_message_id, name=tag_name)
    db.session.add(image_tag)

    # # Commit to db
    db.session.commit()



@app.route('/', methods=['GET'])
def index():

    # setup params
    chat_id = None
    type = 0
    text_body = 'keyword2'

    send_message(chat_id, type, text_body)

    # return jsonify({'message': 'Hellewwww'})
    return return_all_messages(None)










def predict_image(url):
    clarify_app = ClarifaiApp(api_key='f1875131fe714022839da5b30910e18a')
    
    model = clarify_app.public_models.general_model
    model.model_version = 'aa7f35c01e0642fda5cf400f543e7c40'
    response = model.predict([ClImage(url=url)])
    # print(response)

    return response
