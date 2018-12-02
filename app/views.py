import uuid, os, re
from datetime import datetime
from flask import render_template, request, redirect, jsonify
from app.exceptions import InvalidInput
from app.models import Chat, ChatMessage, Estimate, EstimateItem
from app.schema import chat_schema, chat_message_schema, chat_messages_schema, estimate_schema, estimate_item_schema
from app.enums import MessageType
from app import app, db, socketio
import nexmo
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage

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
        socketio.emit('receive_message', json_body)

        chat_id = None
        create_chat_message(chat_id, False, json_body.get('type'), json_body.get('text'))
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
def return_all_messages(chat_id):
    messages = db.session.query(ChatMessage).filter(ChatMessage.chat_id==chat_id)
    
    return chat_messages_schema.jsonify(messages)




@socketio.on('send_message')
def send_message(chat_id, type, text_body):
    print(text_body)

    client = nexmo.Client(key='c6b89e5c', secret='NiwYj5KhU1ycZFTw')

    client.send_message({
        'from': '12262403107',
        # 'to': '16139211286',
        'to': '14167096814',
        'text': text_body,
    })

    create_chat_message(chat_id, True, type, text_body)



def create_chat_message(chat_id, sent_from_self, type, text_body):
    
    # Create chat message
    chat_message = ChatMessage(chat_id=chat_id, sent_from_self=sent_from_self, type=type, text_body=text_body)
    db.session.add(chat_message)

    # Commit to db
    db.session.commit()

    # # If the message is an image, save the tags above a threshold
    # threshold_value = 0.98
    
    # # temporary while we have no images, set to text
    # # if (type == 0):

    # response = predict_image("https://public.boxcloud.com/api/2.0/internal_files/360296939794/versions/380820908194/representations/jpg_paged_2048x2048/content/1.jpg?access_token=1!inQjeH66yoHferqPheYSlcq4XhX2oSHK9_4bpIxmoV4svuMO79D79qsVxRcvLmLVN146t-j5KfJGLNxJ2WVhrNjfDTp1B06b6FMkeIP4WLMGFKUoFWsh80frEiY27BvvRX0Pwc0A5VfmRg1FHlKuci2T3aL5nxLeYNvY12yjvMemuVKr4X1lfcMKnQrXSpXR9VvkoG3VZSFoVWtrVd3n0ylZV-XFwtgAiqtuzWpfDBZ20rFWmYN-eVVnVsOpy2jOT0L5H77lxuvupBRH3V01eHKFuFtjiQHd47eG6L6DllN-lO3e_esvzDoiszI0UZt9bzug2wMPP51cDZuPNGzTmB09Wlt-Sfk9ITfov71sKsSSMMJv4Wn8HcAiTH0lZ6dNH2_HujCAO7zL0LZmczBGlV7wj5EoozCh4eZq5lKKSjkzxGH9QsjNMJLzHjyJsZYiyvjl3aCj2xYAoKnMlMZ7msiOO02FIM4i3wIkAIRNpoU5XsGUodY8VY76q2o5GoohcxTZ78T072eG2EgJ8uAl9esyH7ruwGfEjEtDRPtKrt_GwtvPu2wWfwPErImt49rnMA..&box_client_name=box-content-preview&box_client_version=1.58.3")
    # output_list = response.get('outputs')
    # print(output_list)
    # for output in output_list:
    #     concepts = output.get('concepts')
    #     print concepts
    #     # if (output.get('value') >= threshold_value):
    #         # print(output)


def create_image_tag(chat_message_id, tag_name):
    
    # Create image tag
    image_tag = ImageTag(chat_message_id=chat_message_id, tag_name=tag_name)
    db.session.add(image_tag)

    # Commit to db
    db.session.commit()



@app.route('/', methods=['GET'])
def index():

    # setup params
    chat_id = None
    type = 0
    text_body = 'Yep, talking to you...'

    send_message(chat_id, type, text_body);

    # return jsonify({'message': 'Hellewwww'})
    return return_all_messages(None)









def predict_image(url):
    clarify_app = ClarifaiApp(api_key='f1875131fe714022839da5b30910e18a')
    
    model = clarify_app.public_models.general_model
    model.model_version = 'aa7f35c01e0642fda5cf400f543e7c40'
    response = model.predict([ClImage(url=url)])
    # print(response)

    return response


