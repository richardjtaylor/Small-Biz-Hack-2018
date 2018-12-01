from marshmallow import fields
#from app.models import Player, GamePlayer, Game
from app import ma

# class PlayerSchema(ma.ModelSchema):
#     class Meta:
#         fields = ('id', 'name', 'rank', 'image_url', 'wins', 'losses', 'ties')
#         model = Player

# class GamePlayerSchema(ma.ModelSchema):
#     class Meta:
#         fields = ('player', 'score')
#         model = GamePlayer
#     player = fields.Nested(PlayerSchema)

# class GameSchema(ma.ModelSchema):
#     class Meta:
#         fields = ('id', 'date', 'players')
#         model = Game      
#     players = fields.Nested(GamePlayerSchema, many=True)
        
# player_schema = PlayerSchema()
# players_schema = PlayerSchema(many=True)
# game_schema = GameSchema()
# games_schema = GameSchema(many=True)