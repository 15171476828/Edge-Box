import json

original_string = """
{
	"MsgID": 17,
	"Result": 0,
	"data": [{
		"ID": 1,
		"Name": "fmarking",
		"Vision": "v1.0.0",
		"DateChanged": "2023/08/29 02:38:29",
		"Status": "active",
		"CPU": "0.00%",
		"RAM": "0.40%"
	}]
}
"""


def response_appStatus(private_data, MsgID):
    return json.loads(original_string)
