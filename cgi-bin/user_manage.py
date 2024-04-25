import json

original_string = """
{
	"MsgID": 15,
	"Result": 0,
	"data": [{
		"id": "1",
		"name": "iiot",
		"email": "iiot@nio.com",
		"password": "123456",
		"role": "管理员"
	}]
}
"""


def response_loadUser(private_data, MsgID):
    return json.loads(original_string)
