// system_manage.js
var system_cfg = {
  timeStamp: null,
  ntpURL : null
};

window.onload = function() {
  read_system_manage_from_server().then(() => {
    document.getElementById("ntp-url").value = system_cfg.ntpURL;
  });
  setInterval(read_system_manage_from_server, 2000); 
};



document.getElementById('upgrade-form').addEventListener('submit', function(event) {
    // 获取文件选择器的DOM元素
    const fileInput = document.getElementById('upgrade-file');

    // 获取所选文件名称
    const fileName = fileInput.files[0].name;
    console.log('选定的文件名:', fileName);


    // 创建一个FormData对象，并将选择的文件附加到其中
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    // 发送POST请求以上传文件
    fetch(serverURL+'home/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      console.log('文件已成功上传');
      document.getElementById('upload-status').textContent = '上传已完成';
      document.getElementById('upload-status').style.color = 'green';
    })
    .catch(error => {
      console.error('上传过程中出现错误:', error);
      document.getElementById('upload-status').textContent = '上传失败';
      document.getElementById('upload-status').style.color = 'red';
    });
    event.preventDefault();
  });


// 设置系统时间按钮触发
document.getElementById('time-setting-button').addEventListener('click', function(event) {
  // 获取时间设置输入的值
  var dateInput = document.getElementById('time-setting').value;
  // 将输入值转换成Date对象
  var date = new Date(dateInput);
  // 将Date对象转换成Unix时间戳（秒）
  system_cfg.timeStamp = Math.floor(date.getTime() / 1000);
  write_system_param_to_server(1);
  event.preventDefault();
});

// 设置NTP按钮触发
document.getElementById('ntp-sync').addEventListener('click', function() {
  write_system_param_to_server(2);
});

// 设置系统时间
function write_system_param_to_server(id){
  // 创建一个新的JSON对象
  var jsonData = {
    "MsgID": 12,
    "data": {
      "subID": id,
      "timestamp": system_cfg.timeStamp,
      "ntpURL":system_cfg.ntpURL
    }
  };

  fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData)
  })
  .then(response => response.text())
  .then(result => {
    console.log('时间戳已成功上传');
    document.getElementById('time-set-status').textContent = '设置已完成';
    document.getElementById('time-set-status').style.color = 'green';
  })
  .catch(error => {
    console.error('上传过程中出现错误:', error);
    document.getElementById('time-set-status').textContent = '设置失败';
    document.getElementById('time-set-status').style.color = 'red';
  });
}

// 加载系统日记
document.getElementById('print-log').addEventListener('click', function() {
  fetch(logURL)
  .then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.text();
  })
  .then(data => {
    console.log('Data: ', data);
    document.getElementById('log-textarea').value = data;
  })
  .catch(error => {
    console.log('Error: ', error.message);
    document.getElementById('log-textarea').value = '加载日志时出现错误：' + error.message;
  });
});

// 加载应用日记
document.getElementById('app-log').addEventListener('click', function() {
  fetch(AppLogURL)
  .then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.text();
  })
  .then(data => {
    console.log('Data: ', data);
    document.getElementById('log-textarea').value = data;
  })
  .catch(error => {
    console.log('Error: ', error.message);
    document.getElementById('log-textarea').value = '加载日志时出现错误：' + error.message;
  });
});

// 将时间戳转换为日期字符串
function timestampToDate(timestamp) {
  var date = new Date((timestamp + 8 * 60 * 60) * 1000); // Add timezone offset for Beijing time (UTC+8)
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// 显示服务器时间
function displayServerTime() {
  var serverTime = system_cfg.timeStamp;
  var date = timestampToDate(serverTime);
  document.getElementById('server-time').textContent = "网关当前时间: " + date;
}

function read_system_manage_from_server(){
  var jsonData = {
    MsgID:13,
    data:null,
  };
  var requst_body = JSON.stringify(jsonData, null, 2);
  console.log(requst_body);
 // 使用fetch API发送数据
  return fetch(serverURL, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
    },
    body: requst_body,
  })
  .then(response => response.json()) 
  .then(data => {
    console.log(data);
    system_cfg.timeStamp =data.data.timestamp;
    system_cfg.ntpURL =data.data.ntpURL;
    displayServerTime();
  })
  .catch((error) => {
    console.error('发送失败:', error);
  });
}