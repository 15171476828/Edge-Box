import json

original_string = """
{
	"MsgID": 13,
	"Result": 0,
	"data": {
		"subID": 2,
		"timestamp": 1693808836,
		"ntpURL": "ntp.nioint.com"
	}
}
"""


def response_systemMgrFromServer(private_data, MsgID):
    return json.loads(original_string)
