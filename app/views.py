import uuid, os, re
from datetime import datetime
from flask import render_template, request, redirect, jsonify
from app.exceptions import InvalidInput
#from app.models import Player, GamePlayer, Game
#from app.schema import players_schema, player_schema, games_schema, game_schema
#from app.enums import GameOutcome
from app import app, db, socketio

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
    socketio.emit('receive_message', request.get_json())
  return ('', 204)

@socketio.on('send_message')
def send_message(message):
    print(message)