from flask import request, jsonify
import json
from ..controllers.echoController import *

def router(app):

  @app.route('/')
  def index():
    return app.send_static_file('index.html')

  @app.route('/api/echo', methods=['GET', 'POST'])
  def echo_handler():
    if (request.method == 'POST'):
      data = json.loads(request.data)
      return jsonify(add_echo(data))

    if (request.method == 'GET'):
      params = request.args
      if (len(params) == 0):
        return jsonify(results=get_all_echos())
