import uuid, os, re
from datetime import datetime
from flask import render_template, request, redirect, jsonify
from app.exceptions import InvalidInput
from app.models import Chat, ChatMessage, Estimate, EstimateItem
from app.schema import chat_schema, chat_message_schema, estimate_schema, estimate_item_schema
from app.enums import MessageType
from app import app, db, socketio
import nexmo

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



@app.route('/', methods=['GET'])
def index():

    # setup params
    chat_id = None
    type = 'text'
    text_body = 'What up Neil? Haven\'t heard from you in a while. Hope you\'re well mate!'

    send_message(chat_id, type, text_body);

    return jsonify({'message': 'Hellewwww'})







# from clarifai.rest import ClarifaiApp
# from clarifai.rest import Image as ClImage

# app = ClarifaiApp(api_key='your_api_key')
# model = app.public_models.general_model
# model.model_version = 'aa7f35c01e0642fda5cf400f543e7c40'
# response = model.predict(Image(url="https://samples.clarifai.com/metro-north.jpg"))



