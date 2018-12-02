from marshmallow import fields
from app.models import Chat, ChatMessage, Estimate, EstimateItem
from app import ma

class EstimateItemSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'estimate_id')
        model = EstimateItem

class EstimateSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'chat_id', 'estimate_items')
        model = Estimate
    estimate_items = fields.Nested(EstimateItemSchema, many=True)

class ChatMessageSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'chat_id', 'sent_from_self', 'type', 'text_body')
        model = ChatMessage

class ChatSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'chat_messages', 'estimates')
        model = Chat
    chat_messages = fields.Nested(ChatMessageSchema, many=True)
    estimates = fields.Nested(EstimateSchema, many=True)


chat_schema = ChatSchema()
chat_message_schema = ChatMessageSchema()
estimate_schema = EstimateSchema()
estimate_item_schema = EstimateItemSchema()
