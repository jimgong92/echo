from flask import request, jsonify
import json

def router(app):

  @app.route('/')
  def index():
    return app.send_static_file('index.html')