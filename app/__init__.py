import os
from flask import Flask, render_template, request, redirect, url_for, jsonify
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Setup App
app = Flask(__name__)
configuration_file = os.environ.get('ENV_VAR_DETERMINING_PROD', 'app.config.DevelopmentConfig') #TODO: determine config
app.config.from_object(configuration_file)

# Setup + SQLAlchemy + Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Import the application views
from app import views