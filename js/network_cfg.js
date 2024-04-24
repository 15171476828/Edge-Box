// network_cfg.js
var wifi_cfg = {
      wifiEnabled: null, 
      ssid: null, 
      password: null, 
      security: null, 
      channel: null, 
      lan_dhcp: null, 
      lan_ip: null, 
      lan_subnet: null,
      lan_gateway: null, 
      lan_dns: null, 
      wan_dhcp: null, 
      wan_ip: null, 
      wan_subnet: null,
      wan_gateway: null, 
      wan_dns: null ,
      wan_mac: null 
};


window.onload = function() {
  read_network_param_from_server();
};


function network_read_param() {
    wifi_cfg.wifiEnabled = document.getElementById('wifi').checked;
    wifi_cfg.ssid = document.getElementById('ssid').value;
    wifi_cfg.password = document.getElementById('password').value;
    wifi_cfg.security = document.getElementById("security").value;
    wifi_cfg.channel = document.getElementById("channel").value;
    wifi_cfg.lan_dhcp =  document.getElementById('lan_dhcp').checked;
    wifi_cfg.lan_ip = document.getElementById("lan_ip").value;
    wifi_cfg.lan_subnet = document.getElementById("lan_subnet").value;
    wifi_cfg.lan_gateway = document.getElementById("lan_gateway").value;
    wifi_cfg.lan_dns = document.getElementById("lan_dns").value;
    wifi_cfg.wan_dhcp =  document.getElementById('wan_dhcp').checked;
    wifi_cfg.wan_ip = document.getElementById("wan_ip").value;
    wifi_cfg.wan_subnet = document.getElementById("wan_subnet").value;
    wifi_cfg.wan_gateway = document.getElementById("wan_gateway").value;
    wifi_cfg.wan_dns = document.getElementById("wan_dns").value;
    wifi_cfg.wan_mac = document.getElementById("wan_mac").value;
    console.log('从页面读取参数');
}


function read_network_param_from_server(){
  var txroot = {
    MsgID:1,
    data:null,
  };
  var jsonString = JSON.stringify(txroot, null, 2);
  console.log(jsonString);
 // 使用fetch API发送数据
 fetch(serverURL, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
    },
    body: jsonString,
  })
  .then(response => response.json()) 
  .then(data => {
    console.log(data);
    wifi_cfg.wifiEnabled = document.getElementById('wifi').checked = data.data.wifiEnabled;
    wifi_cfg.ssid = document.getElementById('ssid').value = data.data.ssid;
    wifi_cfg.password = document.getElementById('password').value = data.data.password;``
    wifi_cfg.security = document.getElementById('security').value = data.data.security;
    wifi_cfg.channel = document.getElementById('channel').value = data.data.channel;
    wifi_cfg.lan_dhcp =  document.getElementById('lan_dhcp').checked = data.data.lan_dhcp;
    wifi_cfg.lan_ip = document.getElementById('lan_ip').value = data.data.lan_ip;
    wifi_cfg.lan_subnet = document.getElementById('lan_subnet').value = data.data.lan_subnet;
    wifi_cfg.lan_gateway = document.getElementById('lan_gateway').value = data.data.lan_gateway;
    wifi_cfg.lan_dns = document.getElementById('lan_dns').value = data.data.lan_dns;
    wifi_cfg.wan_dhcp =  document.getElementById('wan_dhcp').checked = data.data.wan_dhcp;
    wifi_cfg.wan_ip = document.getElementById('wan_ip').value = data.data.wan_ip;
    wifi_cfg.wan_subnet = document.getElementById('wan_subnet').value = data.data.wan_subnet;
    wifi_cfg.wan_gateway = document.getElementById('wan_gateway').value = data.data.wan_gateway;
    wifi_cfg.wan_dns = document.getElementById('wan_dns').value = data.data.wan_dns;
    wifi_cfg.wan_mac = document.getElementById('wan_mac').value = data.data.wan_mac;
    console.log('从服务器读取参数并更新到本地变量及页面');

    toggleWifi(document.getElementById('wifi').checked);
    toggleLan(document.getElementById('lan_dhcp').checked);
    toggleWan(document.getElementById('wan_dhcp').checked);
  })
  .catch((error) => {
    console.error('发送失败:', error);
  });
}


function write_network_param_to_server(){
  network_read_param();
  var txroot = {
    MsgID:2,
    data:null,
  };
  txroot.data=JSON.parse(JSON.stringify(wifi_cfg));
  var jsonString = JSON.stringify(txroot, null, 2);
  console.log(jsonString);
 // 使用fetch API发送数据
 fetch(serverURL, {
  method: 'POST', // 或者 'PUT'
  headers: {
      'Content-Type': 'application/json',
    },
    body: jsonString,
  })
  .then(response => response.json()) 
  .then(data =>{ 
    console.log(data);
    document.getElementById('network-save-status').textContent = '保存已完成';
    document.getElementById('network-save-status').style.color = 'green';
  })
  .catch((error) => {
    console.error('发送失败:', error);
    document.getElementById('network-save-status').textContent = '保存失败';
    document.getElementById('network-save-status').style.color = 'red';
  });
}

// 当Wifi checkbox改变时，设置相关输入框的disabled属性
function toggleWifi(checked) {
  ['ssid', 'password', 'security', 'channel'].forEach(function(id) {
      document.getElementById(id).disabled = !checked;
  });
}

// 当Lan的DHCP checkbox改变时，设置相关输入框的disabled属性
function toggleLan(checked) {
  ['lan_ip', 'lan_subnet', 'lan_gateway', 'lan_dns'].forEach(function(id) {
      document.getElementById(id).disabled = checked;
  });
}

// 当Wan的DHCP checkbox改变时，设置相关输入框的disabled属性
function toggleWan(checked) {
  ['wan_ip', 'wan_subnet', 'wan_gateway', 'wan_dns'].forEach(function(id) {
      document.getElementById(id).disabled = checked;
  });
}
