// home.js
function updateProtocolForm() {
    const protocolType = document.getElementById('protocol-type').value;
    document.getElementById('opc-ua-config').style.display = protocolType === 'opc-ua' ? '' : 'none';
    document.getElementById('mqtt-config').style.display = protocolType === 'mqtt' ? '' : 'none';
    document.getElementById('webapi-config').style.display = protocolType === 'webapi' ? '' : 'none';
}

window.onload = function() {
    server_read_param_from_html();
    read_server_param_from_server();
};


// 全局结构体，包含全部配置项
var serverConfig = {
    protocolType: '',
    opcUaConfig: {
      serverName: '',
      serverUrl: '',
      securityPolicy: '',
      securityMode: '',
      username: '',
      password: ''
    },
    mqttConfig: {
      mqttBroker: '',
      mqttSubTopic: '',
      mqttPubTopic: '',
      mqttUsername: '',
      mqttPassword: ''
    },
    webapiConfig: {
      webapiUrl: '',
      webapiMethod: ''
    }
  };

  function server_read_param_from_html() {
    // 获取表单元素
    var form = document.getElementById('protocol-config-form');
    // 获取选择的协议类型
    var protocolType = form.elements['protocol-type'].value;
    serverConfig.protocolType = protocolType;
    // 根据协议类型获取其他相关参数
    if (protocolType === 'opc-ua') {
        serverConfig.opcUaConfig.serverName = form.elements['server-name'].value;
        serverConfig.opcUaConfig.serverUrl = form.elements['server-url'].value;
        serverConfig.opcUaConfig.securityPolicy = form.elements['security-policy'].value;
        serverConfig.opcUaConfig.securityMode = form.elements['security-mode'].value;
        serverConfig.opcUaConfig.username = form.elements['username'].value;
        serverConfig.opcUaConfig.password = form.elements['password'].value;
    } else if (protocolType === 'mqtt') {
        serverConfig.mqttConfig.mqttBroker = form.elements['mqtt-broker'].value;
        serverConfig.mqttConfig.mqttSubTopic = form.elements['mqtt-subtopic'].value;
        serverConfig.mqttConfig.mqttPubTopic = form.elements['mqtt-pubtopic'].value;
        serverConfig.mqttConfig.mqttUsername = form.elements['mqtt-username'].value;
        serverConfig.mqttConfig.mqttPassword = form.elements['mqtt-password'].value;
    } else if (protocolType === 'webapi') {
        serverConfig.webapiConfig.webapiUrl = form.elements['webapi-url'].value;
        serverConfig.webapiConfig.webapiMethod = form.elements['webapi-method'].value;
    }
    // 将结构体转换为JSON
    var jsonString = JSON.stringify(serverConfig);
    // 打印JSON
    console.log(jsonString);
}

function update_html_elements() {
    const form = document.getElementById('protocol-config-form');
  
    form.elements['protocol-type'].value = serverConfig.protocolType;
  
    if (serverConfig.protocolType === 'opc-ua') {
      form.elements['server-name'].value = serverConfig.opcUaConfig.serverName;
      form.elements['server-url'].value = serverConfig.opcUaConfig.serverUrl;
      form.elements['security-policy'].value = serverConfig.opcUaConfig.securityPolicy;
      form.elements['security-mode'].value = serverConfig.opcUaConfig.securityMode;
      form.elements['username'].value = serverConfig.opcUaConfig.username;
      form.elements['password'].value = serverConfig.opcUaConfig.password;
    } else if (serverConfig.protocolType === 'mqtt') {
      form.elements['mqtt-broker'].value = serverConfig.mqttConfig.mqttBroker;
      form.elements['mqtt-subtopic'].value = serverConfig.mqttConfig.mqttSubTopic;
      form.elements['mqtt-pubtopic'].value = serverConfig.mqttConfig.mqttPubTopic;
      form.elements['mqtt-username'].value = serverConfig.mqttConfig.mqttUsername;
      form.elements['mqtt-password'].value = serverConfig.mqttConfig.mqttPassword;
    } else if (serverConfig.protocolType === 'webapi') {
      form.elements['webapi-url'].value = serverConfig.webapiConfig.webapiUrl;
      form.elements['webapi-method'].value = serverConfig.webapiConfig.webapiMethod;
    }
  }

function read_server_param_from_server(){
    var http_read_server_param = {
      MsgID:3,
      data:null,
    };
    var requst_body = JSON.stringify(http_read_server_param, null, 2);
    console.log(requst_body);
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
      serverConfig.protocolType = data.data.protocolType;
      serverConfig.opcUaConfig = data.data.opcUaConfig;
      serverConfig.mqttConfig = data.data.mqttConfig;
      serverConfig.webapiConfig = data.data.webapiConfig;
      update_html_elements(); // 更新HTML元素
      updateProtocolForm();
    })
    .catch((error) => {
      console.error('发送失败:', error);
    });
  }


function write_server_param_to_server(){
    server_read_param_from_html();
    var txroot = {
        MsgID:4,
        data:null,
      };
    txroot.data=JSON.parse(JSON.stringify(serverConfig));
    var txroot_string = JSON.stringify(txroot, null, 2);
    console.log(txroot_string);
   // 使用fetch API发送数据
   fetch(serverURL, {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
      },
      body: txroot_string,
    })
    .then(response => response.json()) 
    .then(data =>{ 
      console.log(data);
      document.getElementById('server-save-status').textContent = '上传已完成';
      document.getElementById('server-save-status').style.color = 'green';
    })
    .catch((error) => {
      console.error('发送失败:', error);
      document.getElementById('server-save-status').textContent = '上传失败';
      document.getElementById('server-save-status').style.color = 'red';
    });
  }