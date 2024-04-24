// common.js
// YZH: Modify start:
// const ipAddress = '192.168.2.1';
// var serverURL = `http://${ipAddress}:8080/`;
const myGunicorn = '/api/commonhandle';
const ipAddress = `192.168.192.139${myGunicorn}`;
var serverURL = `http://${ipAddress}`;
// YZH: Modify end:


var logURL = `http://${ipAddress}/log.txt`;
var AppLogURL = `http://${ipAddress}/log_app.txt`;
var userNumber = 1;
var users = [];
var systemStatus = {
  cpu_usage: null,
  cpu_temperature: null,
  total_memory: null,
  memory_usage: null,

  status_4g: null,
  network_type: null,
  online_time: null,
  signal_strength: null,

  wifi_status: null,
  network_name: null,
  ip_address: null,
  wifi_strength: null,

  device_status: null,
  data_period: null,
  device_code: null,
  protocol_type: null,

  server_status: null,
  report_period: null,
  server_ip: null,
  north_protocol_type: null
};
function createNavigation() {
    var navigation = `
      <div class="navbar">
            <div class="navbar_header">
                <div class="navbar_logo">
                    <img class="nio-logo" src="../images/icon_logo.png" alt="">
                    <img class="NIO-logo" src="../images/NIO.jpg" alt="">
                </div>
                <div class="navbar_text">                  
                    <p class="gateway-text" >Gateway</p>
                </div>
            </div>
        <ul>
        <li><a href="home.html"><div class="nav-item"><img src="../images/navigation/icon1.svg" alt="">首页</div></a></li>
          <li><a href="network_cfg.html"><div class="nav-item"><img src="../images/navigation/icon2.svg" alt="">网络配置</div></a></li>
          <li><a href="server_cfg.html"><div class="nav-item"><img src="../images/navigation/icon3.svg" alt="">服务器配置</div></a></li>
          <li><a href="device_cfg.html"><div class="nav-item"><img src="../images/navigation/icon3.svg" alt="">设备配置</div></a></li>
          <li><a href="tags_cfg.html"><div class="nav-item"><img src="../images/navigation/icon3.svg" alt="">数采标签</div></a></li>
          <li><a href="app_manage.html"><div class="nav-item"><img src="../images/navigation/icon3.svg" alt="">应用管理</div></a></li>
          <li><a href="system_manage.html"><div class="nav-item"><img src="../images/navigation/icon3.svg" alt="">系统管理</div></a></li>
          <li><a href="user_manage.html"><div class="nav-item"><img src="../images/navigation/icon3.svg" alt="">用户管理</div></a></li>
        </ul>  
      </div>
      <div class="info-bar">
        <button class="transparent-button" title="用户信息">
        <img src="../images/info_bar/icon_user.svg" alt="用户信息">
        </button>
        <button class="transparent-button" onclick="log_out()"  title="退出登录" >
          <img src="../images/info_bar/icon_exit.svg" alt="退出">
        </button>
        <button class="transparent-button" onclick="system_restart()" title="重启网关">
          <img src="../images/info_bar/icon_refresh.svg" alt="重启">
        </button>
      </div>
    `;
    //   <p class="info-text">当前用户</p>
    // 配置活动页状态
    document.addEventListener('DOMContentLoaded', function () {
    setActiveNavigation();
    });
    return navigation;
  }

function setActiveNavigation() {
    var currentUrl = window.location.href;

    // 获取所有导航项的<a>元素
    var navigationItems = document.querySelectorAll('.navbar li a');

    // 遍历每个导航项
    for (var i = 0; i < navigationItems.length; i++) {
        var navItem = navigationItems[i];

        // 如果当前URL包含该导航项的href属性值，则为其添加active类名
        if (currentUrl.indexOf(navItem.getAttribute('href')) > -1) {
        navItem.classList.add('active');
        }
    }
}

function log_out() {
    window.location.replace("../index.html");
  }

function system_restart(){
  var txroot = {
    MsgID:9,
    data:null,
  };
  var requst_body = JSON.stringify(txroot, null, 2);
  // 使用fetch API发送数据
  fetch(serverURL, {
  method: 'POST', 
  headers: {
      'Content-Type': 'application/json',
    },
    body: requst_body,
  })
  .then(response => response.json()) 
  .then(data => {
    console.log(data);
  })
  .catch((error) => {
    console.error('发送失败:', error);
  });
}

// 获取系统状态
function read_status_from_server(){
  var txroot = {
      MsgID:10,
      data:null,
      };
  var jsonString = JSON.stringify(txroot, null, 2);
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
     // 更新网关硬件状态
     systemStatus.cpu_usage  = data.data.cpu_usage;
     systemStatus.cpu_temperature  = data.data.cpu_temperature;
     systemStatus.total_memory = data.data.total_memory;
     systemStatus.memory_usage  = data.data.memory_usage;

      // 更新4G联网状态
      systemStatus.status_4g  = data.data.status_4g;
      systemStatus.network_type  = data.data.network_type;
      systemStatus.online_time  = data.data.online_time;
      systemStatus.signal_strength  = data.data.signal_strength;

      // 更新WiFi状态
      systemStatus.wifi_status  = data.data.wifi_status;
      systemStatus.network_name  = data.data.network_name;
      systemStatus.ip_address  = data.data.ip_address;
      systemStatus.wifi_strength  = data.data.wifi_strength;

      // 更新数采设备状态
      systemStatus.device_status  =  data.data.device_status;
      systemStatus.data_period  =  data.data.data_period;
      systemStatus.device_code  =  data.data.device_code;
      systemStatus.protocol_type  =  data.data.protocol_type;

      // 更新服务器状态
      systemStatus.server_status  = data.data.server_status;
      systemStatus.report_period  = data.data.report_period;
      systemStatus.server_ip  = data.data.server_ip;
      systemStatus.north_protocol_type  = data.data.north_protocol_type;
      })
  .catch((error) => {
      console.error('发送失败:', error);
  });
}
