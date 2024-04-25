import json

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


def demo_function():
    return json.loads(original_string)
