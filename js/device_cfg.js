// home.js
function updateDeviceModel() {
    const brandSelect = document.getElementById('device-brand');
    const modelSelect = document.getElementById('device-model');
    const selectedBrand = brandSelect.value;

    const models = {
        mitsubishi: ['MELSEC_iQ_R', 'MELSEC_Q', 'MELSEC_iQ_F'],
        siemens: ['S7_200Smart', 'S7_1200', 'S7_1500'],
        omron: ['NJ', 'NX', 'CP', 'CJ'],
        keyence: ['KV_Nano', 'KV_3000', 'KV_5000', 'KV_8000'],
        modbus: ['Modbus_Master', 'Modbus_Slave']
    };
    modelSelect.innerHTML = '';

    models[selectedBrand].forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.text = model;
        modelSelect.add(option);
    });
    modelSelect.value = device_cfg.modelSelect;
}

window.onload = function() {
  read_device_param_from_server();
};

var device_cfg = {
  deviceName: null,
  brandSelect : null, 
  modelSelect: null,  
  ip: null,
  port: null, 
  cycle: null, 
  timeout: null,
  retry: null 
};


function read_device_param_from_html() {
    // 获取表单元素
    var form = document.getElementById('device-config-form');
    device_cfg.deviceName = form.elements['device-name'].value;
    device_cfg.brandSelect = form.elements['device-brand'].value;
    device_cfg.modelSelect = form.elements['device-model'].value;
    device_cfg.ip = form.elements['ip-address'].value;
    device_cfg.port = form.elements['tcp-port'].value;
    device_cfg.cycle = form.elements['sampling-cycle'].value;
    device_cfg.timeout = form.elements['timeout'].value;
    device_cfg.retry = form.elements['retry-count'].value;

    // 将结构体转换为JSON
    var jsonString = JSON.stringify(device_cfg);
    // 打印JSON
    console.log(jsonString);
}

function read_device_param_from_server(){
    var txroot = {
      MsgID:5,
      data:null,
    };
    var requst_body = JSON.stringify(txroot, null, 2);
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
      var form = document.getElementById('device-config-form');
      device_cfg.deviceName = form.elements['device-name'].value=data.data.deviceName;
      device_cfg.brandSelect = form.elements['device-brand'].value=data.data.brandSelect;
      device_cfg.modelSelect = form.elements['device-model'].value=data.data.modelSelect;
      device_cfg.ip = form.elements['ip-address'].value=data.data.ip;
      device_cfg.port = form.elements['tcp-port'].value=data.data.port;
      device_cfg.cycle = form.elements['sampling-cycle'].value=data.data.cycle;
      device_cfg.timeout = form.elements['timeout'].value=data.data.timeout;
      device_cfg.retry = form.elements['retry-count'].value=data.data.retry;
      updateDeviceModel();
      console.log('从服务器读取s设备参数并更新到本地变量及页面');
    })
    .catch((error) => {
      console.error('发送失败:', error);
    });
  }

function write_device_param_to_server(){
    read_device_param_from_html();
    var txroot = {
        MsgID:6,
        data:null,
      };
    txroot.data=JSON.parse(JSON.stringify(device_cfg));
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
    .then(data =>{ 
      console.log(data);
      document.getElementById('device-save-status').textContent = '保存已完成';
      document.getElementById('device-save-status').style.color = 'green';
    })
    .catch((error) => {
      console.error('发送失败:', error);
      document.getElementById('device-save-status').textContent = '保存失败';
      document.getElementById('device-save-status').style.color = 'red';
    });
  }