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
    image_tags = db.relationship('ImageTag', backref='chat_message')
    sent_from_self = db.Column(db.Boolean)
    type = db.Column(db.Integer, nullable=False)
    text_body = db.Column(db.String(5000))


class ImageTag(db.Model):
    __tablename__ = 'image_tag'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    chat_message_id = db.Column(UUID(as_uuid=True), db.ForeignKey('chat_message.id'))
    name = db.Column(db.String(100))



class Estimate(db.Model):
    __tablename__ = 'estimate'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    chat_id = db.Column(UUID(as_uuid=True), db.ForeignKey('chat.id'))
    estimate_items = db.relationship('EstimateItem', backref='estimate')

    # Required for estimate creation:
    qb_id = db.Column(db.String(20))
    qb_customerRef = db.Column(db.String(1000))

    # Not required for estimate creation:
    qb_value = db.Column(db.String(20))



class EstimateItem(db.Model):
    __tablename__ = 'estimate_item'

    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    estimate_id = db.Column(UUID(as_uuid=True), db.ForeignKey('estimate.id'))
