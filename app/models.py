import uuid, datetime
import enum
from sqlalchemy import select, func, text
from sqlalchemy.orm import object_session
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.hybrid import hybrid_property
from app import app, db
from app.enums import MessageType


class Chat(db.Model):
    __tablename__ = 'chat'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    chat_messages = db.relationship('ChatMessage', backref='chat')
    estimates = db.relationship('Estimate', backref='chat')


class ChatMessage(db.Model):
    __tablename__ = 'chat_message'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    chat_id = db.Column(UUID(as_uuid=True), db.ForeignKey('chat.id'))
    sent_from_self = db.Column(db.Boolean)
    type = db.Column(db.Enum(MessageType), nullable=False)
    text_body = db.Column(db.String(5000))


class Estimate(db.Model):
    __tablename__ = 'estimate'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    chat_id = db.Column(UUID(as_uuid=True), db.ForeignKey('chat.id'))
    estimate_items = db.relationship('EstimateItem', backref='estimate')


class EstimateItem(db.Model):
    __tablename__ = 'estimate_item'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    estimate_id = db.Column(UUID(as_uuid=True), db.ForeignKey('estimate.id'))




# class Player(db.Model):
#     __tablename__ = 'player'

#     id = db.Column(db.String(10), index=True, unique=True, primary_key=True)
#     name = db.Column(db.String(64), index=True, unique=True)
#     rank = db.Column(db.Integer, index=True)
#     image_url = db.Column(db.String(1000))

#     @property
#     def wins(self):
#         return object_session(self).scalar(select([func.count(GamePlayer.id)]).where(GamePlayer.player_id == self.id).where(GamePlayer.game_outcome == GameOutcome.win))

#     @property
#     def losses(self):
#         return object_session(self).scalar(select([func.count(GamePlayer.id)]).where(GamePlayer.player_id == self.id).where(GamePlayer.game_outcome == GameOutcome.loss))

#     @property
#     def ties(self):
#         return object_session(self).scalar(select([func.count(GamePlayer.id)]).where(GamePlayer.player_id == self.id).where(GamePlayer.game_outcome == GameOutcome.tie))

#     def __repr__(self):
#         return '<Player %r>' % (self.name)

# class GamePlayer(db.Model):
#     __tablename__ = 'game_player'

#     id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
#     game_id = db.Column(UUID(as_uuid=True), db.ForeignKey('game.id'))
#     player_id = db.Column(db.String(10), db.ForeignKey('player.id'))
#     player = db.relationship("Player", backref="player")
#     score = db.Column(db.Integer, index=True)
#     game_outcome = db.Column(db.Enum(GameOutcome), nullable=False)

#     def __repr__(self):
#         return '<GamePlayer %r>' % (self.id)

# class Game(db.Model):
#     __tablename__ = 'game'

#     id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
#     date = db.Column(db.DateTime, index=True, default=datetime.datetime.now)
#     players = db.relationship("GamePlayer", backref="game")
    
#     def __repr__(self):
#         return '<Game %r>' % (self.id)