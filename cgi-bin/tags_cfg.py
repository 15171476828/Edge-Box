import json

original_string_cfg = """
{
	"MsgID": 7,
	"Result": 0,
	"data": 
	[
		{
			"id": "1",
			"deviceName": "S7_1500",
			"varName": "EquipCode",
			"method": "ReadOnly",
			"register": "DB1",
			"address": "2",
			"dataType": "string",
			"dataLength": "50",
			"currentValue": "J01-36-P-OCV-A-O-TL"
		}, {
			"id": "2",
			"deviceName": "S7_1500",
			"varName": "OUT_LOT_NO",
			"method": "ReadOnly",
			"register": "DB1",
			"address": "258",
			"dataType": "string",
			"dataLength": "30",
			"currentValue": "2023071400001"
		}, {
			"id": "3",
			"deviceName": "S7_1500",
			"varName": "OPRATOR",
			"method": "ReadOnly",
			"register": "DB1",
			"address": "514",
			"dataType": "string",
			"dataLength": "20",
			"currentValue": ""
		}, {
			"id": "4",
			"deviceName": "S7_1500",
			"varName": "IPQC",
			"method": "ReadOnly",
			"register": "DB1",
			"address": "768",
			"dataType": "string",
			"dataLength": "20",
			"currentValue": ""
		}, {
			"id": "5",
			"deviceName": "S7_1500",
			"varName": "cell_result",
			"method": "ReadOnly",
			"register": "DB1",
			"address": "1024",
			"dataType": "int16",
			"dataLength": "2",
			"currentValue": "0"
		}, {
			"id": "6",
			"deviceName": "S7_1500",
			"varName": "flag",
			"method": "ReadWrite",
			"register": "DB1",
			"address": "1026",
			"dataType": "int16",
			"dataLength": "2",
			"currentValue": "2"
		}, {
			"id": "7",
			"deviceName": "S7_1500",
			"varName": "feedback",
			"method": "ReadOnly",
			"register": "DB1",
			"address": "1028",
			"dataType": "int16",
			"dataLength": "2",
			"currentValue": "0"
		}, {
			"id": "8",
			"deviceName": "S7_1500",
			"varName": "M0",
			"method": "ReadOnly",
			"register": "M",
			"address": "0",
			"dataType": "byte",
			"dataLength": "1",
			"currentValue": "0"
		}, {
			"id": "9",
			"deviceName": "S7_1500",
			"varName": "M1",
			"method": "ReadOnly",
			"register": "M",
			"address": "1",
			"dataType": "byte",
			"dataLength": "1",
			"currentValue": "0"
		}, {
			"id": "10",
			"deviceName": "S7_1500",
			"varName": "M2",
			"method": "ReadOnly",
			"register": "M",
			"address": "2",
			"dataType": "byte",
			"dataLength": "1",
			"currentValue": "0"
		}, {
			"id": "11",
			"deviceName": "S7_1500",
			"varName": "M3",
			"method": "ReadOnly",
			"register": "M",
			"address": "3",
			"dataType": "bool",
			"dataLength": "1",
			"currentValue": ""
		}
	]
}
"""


def response_tags_info(private_data, MsgID):
    return json.loads(original_string_cfg)



original_string_value = """
{
	"MsgID": 11,
	"Result": 0,
	"data": [
		{
			"id": 1,
			"currentValue": "J01-36-P-OCV-A-O-TL-B"
		}, {
			"id": 2,
			"currentValue": "2023071400002"
		}, {
			"id": 3,
			"currentValue": "22"
		}, {
			"id": 4,
			"currentValue": "2"
		}, {
			"id": 5,
			"currentValue": "5"
		}, {
			"id": 6,
			"currentValue": "0"
		}, {
			"id": 7,
			"currentValue": "0"
		}, {
			"id": 8,
			"currentValue": "0"
		}, {
			"id": 9,
			"currentValue": "0"
		}, {
			"id": 10,
			"currentValue": "0"
		}, {
			"id": 11,
			"currentValue": "16"
		}
	]
}
"""

def response_tags_value(private_data, MsgID):
    return json.loads(original_string_value)

