// home.js
window.onload = function() { 
    read_status_from_server();
    setInterval(update_system_status, 2000); // 每2秒刷新一次
};

// 获取系统状态
function update_system_status(){
    read_status_from_server();
    // 更新网关硬件状态
    document.getElementById("cpu_usage").innerText = systemStatus.cpu_usage;
    document.getElementById("cpu_temperature").innerText = systemStatus.cpu_temperature;
    document.getElementById("total_memory").innerText = systemStatus.total_memory;
    document.getElementById("memory_usage").innerText = systemStatus.memory_usage;
    // 更新4G联网状态
    document.getElementById("status_4g").innerText = systemStatus.status_4g;
    document.getElementById("network_type").innerText = systemStatus.network_type;
    document.getElementById("online_time").innerText = systemStatus.online_time;
    document.getElementById("signal_strength").innerText = systemStatus.signal_strength;

    // 更新WiFi状态
    document.getElementById("wifi_status").innerText = systemStatus.wifi_status;
    document.getElementById("network_name").innerText = systemStatus.network_name;
    document.getElementById("ip_address").innerText = systemStatus.ip_address;
    document.getElementById("wifi_strength").innerText = systemStatus.wifi_strength;

    // 更新数采设备状态
    document.getElementById("device_status").innerText =  systemStatus.device_status;
    document.getElementById("data_period").innerText =  systemStatus.data_period;
    document.getElementById("device_code").innerText =  systemStatus.device_code;
    document.getElementById("protocol_type").innerText =  systemStatus.protocol_type;

    // 更新服务器状态
    document.getElementById("server_status").innerText = systemStatus.server_status;
    document.getElementById("report_period").innerText = systemStatus.report_period;
    document.getElementById("server_ip").innerText = systemStatus.server_ip;
    document.getElementById("north_protocol_type").innerText = systemStatus.north_protocol_type;
}