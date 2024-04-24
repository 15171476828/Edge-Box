# app.py
from flask_restful import Resource, Api, reqparse, abort
import json
import home



class commonhandle(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('MsgID', type=int, location='json', required=True)
        parser.add_argument('data', type=dict, location='json', help='Sub-object JSON is expected')
        args = parser.parse_args()
        private_data = args['data']
        MsgID  = args['MsgID']
        # print(private_data['user'])

        print('---->>>> 1445:',MsgID)

        if MsgID == 16:
            if private_data['user'] == 'iiot' and private_data['password'] == '123456':
                return {'MsgID':MsgID, 'Result': 0, 'data':{'pass':1}}
            else:
                return {'MsgID':MsgID, 'Result': 0, 'data':{'pass':-2}}
        elif MsgID == 10:
            return home.get_original_string()
        else:
            return {'MsgID':MsgID, 'Result': 1}

    def get(self):
	    abort(RC_NET_METHOD_NOT_ALLOWED)
 
class login(Resource):

    def post(self):
        abort(RC_NET_METHOD_NOT_ALLOWED)

    def get(self):
	    return {'return':1}


class Newbee(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('a', type=str, required=True)
        parser.add_argument('b', type=int, required=True)
        args = parser.parse_args()
        
        _portName  = args['portName']
        _portCtrl  = args['portCtrl']
        return {'a':_portName, 'b':_portCtrl}
    def get(self):
	    return "niubi plus!!!"
