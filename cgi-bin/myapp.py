# app.py
from flask_restful import Resource, Api, reqparse, abort
import json

def get_original_string():
    original_string = """
    {
        "MsgID": 10,
        "Result": 0,
        "data": {
            "cpu_usage": "1.23%",
            "cpu_temperature": "47.00℃",
            "total_memory": "1992288KB",
            "memory_usage": "288800KB",
            "status_4g": "离线",
            "network_type": "LET(4G)",
            "online_time": "0s",
            "signal_strength": "0%",
            "wifi_status": "无驱动",
            "network_name": "IIOT_Gateway",
            "ip_address": "192.168.2.1",
            "wifi_strength": "75%",
            "device_status": "正常",
            "data_period": "300ms",
            "device_code": "Positive coater",
            "protocol_type": "S7_1500",
            "server_status": "在线",
            "report_period": "231ms",
            "server_ip": "172.17.91.130",
            "north_protocol_type": "opc-ua"
        }
    }
    """
    return json.loads(original_string)

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
                # print(private_data['user'], private_data['password'])
                return {'MsgID':MsgID, 'Result': 0, 'data':{'pass':1}}
            else:
                # print(private_data['user'], private_data['password'])
                return {'MsgID':MsgID, 'Result': 0, 'data':{'pass':-2}}
        elif MsgID == 10:
            return get_original_string()
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
