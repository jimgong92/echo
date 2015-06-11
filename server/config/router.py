from flask import request, jsonify
import json
from ..controllers.echoController import *

def router(app):

  @app.route('/')
  def index():
    return app.send_static_file('index.html')

  @app.route('/api/echo/all')
  def get_all():
    return jsonify(results=get_all_echos())

  @app.route('/api/echo', methods=['GET', 'POST'])
  def add_new():
    if (request.method == 'POST'):
      data = json.loads(request.data)
      return jsonify(add_echo(data))