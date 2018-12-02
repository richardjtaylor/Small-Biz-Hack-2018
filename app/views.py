import uuid, os, re
from datetime import datetime
from flask import render_template, request, redirect, jsonify
from app.exceptions import InvalidInput
from app.models import Chat, ChatMessage, Estimate, EstimateItem
from app.schema import chat_schema, chat_message_schema, estimate_schema, estimate_item_schema
from app.enums import MessageType
from app import app, db
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


@app.route('/', methods=['GET'])
def index():

    client = nexmo.Client(key='c6b89e5c', secret='NiwYj5KhU1ycZFTw')

    client.send_message({
        'from': '12262403107',
        'to': '16139211286',
        'text': 'Hey, get fucked.',
    })
    return jsonify({'message': 'Hellewwww'})
