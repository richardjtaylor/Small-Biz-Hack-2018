import os
import pwd

# Obtain the default postgres DB
def get_local_database_url():
    username = pwd.getpwuid( os.getuid() )[ 0 ]
    return 'postgresql://{0}@localhost'.format(username)

class Config(object):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', get_local_database_url())
    HOST="0.0.0.0"
    PORT = 5000

class ProductionConfig(Config):
    PORT = int(os.environ.get('PORT', 5000))

class DevelopmentConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    DEBUG = True