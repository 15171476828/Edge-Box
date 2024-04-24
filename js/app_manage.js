// app_manage.js
window.onload = function() {
  read_apps_status_from_server();
  setInterval(read_apps_status_from_server, 2000); 
};
  

function install_app() {
  // 获取文件选择器的DOM元素
  const fileInput = document.getElementById('new-app-file');

  // 获取所选文件名称
  const fileName = fileInput.files[0].name;
  console.log('选定的文件名:', fileName);


  // 创建一个FormData对象，并将选择的文件附加到其中
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  
  // 发送POST请求以上传文件
  fetch(serverURL+'media/app', {
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

}

// 更新应用表格
function updateAppTable(data) {
  const appList = document.getElementById('appList');
  appList.innerHTML = data.map(item => `
    <tr>
      <td>${item.ID}</td>
      <td>${item.Name}</td>
      <td>${item.Vision}</td>
      <td>${item.DateChanged}</td>
      <td>${item.Status}</td>
      <td>${item.CPU}</td>
      <td>${item.RAM}</td>
      <td>
        <button class="btn" onclick="edit_app('${item.Name}','${item.Status}')">${item.Status === 'active' ? '停用' : '启用'}</button>
        <button class="btn" onclick="delete_app('${item.Name}')">删除</button>
      </td>
    </tr>
  `).join('');
}


// 编辑和删除函数
function edit_app(name,status){
  if(status=='active') modify_app_from_server(name,"disable");
  else modify_app_from_server(name,"enable");
}

function delete_app(name){
  modify_app_from_server(name,"delete");
}

function modify_app_from_server(name,action){
  var txroot = {
    MsgID:18,
    data:{
      "name":name,
      "action":action
      }
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

function read_apps_status_from_server(){
  var txroot = {
    MsgID:17,
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
    updateAppTable(data.data);
  })
  .catch((error) => {
    console.error('发送失败:', error);
  });
}