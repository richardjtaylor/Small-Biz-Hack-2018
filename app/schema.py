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

class ImageTagSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'chat_message_id', 'name')

class ChatMessageSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'chat_id', 'image_tags', 'sent_from_self', 'type', 'text_body')
        model = ChatMessage
    image_tags = fields.Nested(ImageTagSchema, many=True)

class ChatSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'chat_messages', 'estimates')
        model = Chat
    chat_messages = fields.Nested(ChatMessageSchema, many=True)
    estimates = fields.Nested(EstimateSchema, many=True)


chat_schema = ChatSchema()
chat_message_schema = ChatMessageSchema()
chat_messages_schema = ChatMessageSchema(many=True)
image_tag_schema = ImageTagSchema()
image_tags_schema = ImageTagSchema(many=True)
estimate_schema = EstimateSchema()
estimate_item_schema = EstimateItemSchema()
