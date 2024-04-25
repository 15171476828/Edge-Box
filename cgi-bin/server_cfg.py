import json

original_string = """
{
	"MsgID": 3,
	"Result": 0,
	"data": {
		"protocolType": "opc-ua",
		"opcUaConfig": {
			"serverName": "IG01_001",
			"serverUrl": "opc.tcp://192.168.0.5:4840",
			"securityPolicy": "",
			"securityMode": "",
			"username": "iot",
			"password": "nioiot"
		},
		"mqttConfig": {
			"mqttBroker": "tcp://10.110.168.150:1883",
			"mqttSubTopic": "iot_sub",
			"mqttPubTopic": "iot_pub",
			"mqttUsername": "iot",
			"mqttPassword": "nioiot"
		},
		"webapiConfig": {
			"webapiUrl": "",
			"webapiMethod": ""
		}
	}
}
"""


def response_server(private_data, MsgID):
    return json.loads(original_string)
