# app.py
from flask_restful import Resource, Api, reqparse, abort
import json
import network_cfg
import login_page
import home_system
import home_system
import server_cfg
import app_manage
import device_cfg 
import system_manage
import tags_cfg
import user_manage


class commonhandle(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('MsgID', type=int, location='json', required=True)
        parser.add_argument('data', type=dict, location='json', help='Sub-object JSON is expected')
        args = parser.parse_args()
        private_data = args['data']
        MsgID  = args['MsgID']

        print("---->>>> 240425-1531 MsgID:",MsgID)

        if MsgID == 1:                                                              # phase 1:240425 done
            return network_cfg.response_network(private_data, MsgID)
        elif MsgID == 2:
            return network_cfg.save_network(private_data, MsgID)
        elif MsgID == 3:                                                            # phase 1:240425 done
            return server_cfg.response_server(private_data, MsgID)
        elif MsgID == 4:
            return server_cfg.save_server(private_data, MsgID)
        elif MsgID == 5:
            return device_cfg.response_device(private_data, MsgID)
        elif MsgID == 6:
            return device_cfg.save_device(private_data, MsgID)
        elif MsgID == 7:                                                            # phase 1:240424 done
            return tags_cfg.response_tags_info(private_data, MsgID)
        elif MsgID == 8:
            return tags_cfg.save_tags(private_data, MsgID)
        elif MsgID == 9:
            return system_manage.save_system_restart(private_data, MsgID)
        elif MsgID == 10:                                                            # phase 1:240424 done
            return home_system.response_system_status()
        elif MsgID == 11:
            return tags_cfg.response_tags_value(private_data, MsgID)
        elif MsgID == 12:
            return system_manage.save_system(private_data, MsgID)
        elif MsgID == 13:                                                             # phase 1:240425 done
            return system_manage.response_systemMgrFromServer(private_data, MsgID)
        elif MsgID == 14:
            return user_manage.save_user(private_data, MsgID)
        elif MsgID == 15:
            return user_manage.response_loadUser(private_data, MsgID)
        elif MsgID == 16:                                                             # phase 1:240424 done
            return login_page.response_login(private_data, MsgID)
        elif MsgID == 17:                                                             # phase 1:240425 done
            return app_manage.response_appStatus(private_data, MsgID)
        elif MsgID == 18:
            return app_manage.save_app(private_data, MsgID)
        elif MsgID == 19:
            return network_cfg.response_vpn(private_data, MsgID)
        elif MsgID == 20:
            return network_cfg.save_vpn(private_data, MsgID)
        else:
            return {'MsgID':MsgID, 'Result': 'undefined'}

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
