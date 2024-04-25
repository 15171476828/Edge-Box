import json

original_string = """
{ 
    "MsgID": 5, 
    "Result": 0, 
    "data": { 
        "deviceName": "Positive coater", 
        "brandSelect": "siemens", 
        "modelSelect": "S7_1500", 
        "ip": "192.168.0.1", 
        "port": "103", 
        "cycle": "100", 
        "timeout": "3000", 
        "retry": "5" 
    } 
}
"""


def response_device(private_data, MsgID):
    return json.loads(original_string)
