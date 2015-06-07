from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='dist', static_url_path='')
app.config.update(
  DEBUG = True             #Comment out for production
)

if (__name__):
  app.run()