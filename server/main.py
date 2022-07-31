
# from flask import Flask
# from flask_socketio import SocketIO, send, emit
# from flask_cors import CORS
# from engineio.payload import Payload

# Payload.max_decode_packets = 200
# app = Flask(__name__)
# CORS(app, origins="*")
# app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app, cors_allowed_origins="*")


# @socketio.on('makeio')
# def makeConnection(data):
#     @socketio.on(data["id"])
#     def dataShare(pac):
#         emit(data["id"], pac)


# if __name__ == '__main__':
#     app.run()
#     socketio.run(app)

# from crypt import methods
# from  import request
# from ntpath import join
from distutils.log import debug
from flask import Flask, request
import json
import requests
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins="*")


@app.route("/")
def hello_world():
    return ({"name": 3})


@app.route("/run", methods=['POST', 'GET', 'OPTIONS'])
def runCode():
    # if request.method=='POST':
    content_type = request.headers.get('content-type')
    if (content_type == 'application/json'):
        json = request.json
        # return json
        return requests.post("https://onecompiler.com/api/code/exec", json=json).json()
    # else:
    #     return "GET"


if __name__ == "__main__":
    app.run(debug=True)
