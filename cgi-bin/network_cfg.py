import json

# "wifiEnabled": false,
# "wifiEnabled": true,

original_string = """
{
    "MsgID": 1,
    "Result": 0,
    "data": {
        "wifiEnabled": false,
        "ssid": "IIOT_Gateway",
        "password": "ExamplePassword",
        "security": "wpa",
        "channel": "6",
        "lan_dhcp": false,
        "lan_ip": "192.168.0.5",
        "lan_subnet": "255.255.255.0",
        "lan_gateway": "192.168.0.1",
        "lan_dns": "114.114.114.114",
        "wan_dhcp": true,
        "wan_ip": "192.168.2.1",
        "wan_subnet": "255.255.255.0",
        "wan_gateway": "192.168.2.1",
        "wan_dns": "114.114.114.114",
        "wan_mac": "08:00:27:CC:31:69"
    }
}
"""


def response_network(private_data, MsgID):
    return json.loads(original_string)
