# wsgi.py
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
app.api = Api(app)
api = app.api

# 用户方法在这里定义
import myapp

api.add_resource(myapp.commonhandle,       '/api/commonhandle')
api.add_resource(myapp.login,              '/api/login')
api.add_resource(myapp.Newbee,             '/api/Newbee')

if __name__ == "__main__":
    app.run()