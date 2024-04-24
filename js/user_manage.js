// user_manage.js
window.onload = function() {
    load_user_from_server();
  };
  
var userNumber = 1;
var users = [];
// 新增用户
function add_user() {
    var table = document.querySelector('.user_manage table');

    var newRow = document.createElement('tr');
    var idText = document.createElement('td');
    var nameCell = document.createElement('td');
    var emailCell = document.createElement('td');
    var passwordCell = document.createElement('td');
    var roleCell = document.createElement('td');
    var actionCell = document.createElement('td');

    var idTextNode = document.createTextNode(userNumber++);
    idText.appendChild(idTextNode);
    var nameInput = document.createElement('input');
    var emailInput = document.createElement('input');
    var passwordInput = document.createElement('input');
    var roleSelect = document.createElement('select');

    nameInput.type = 'text';
    emailInput.type = 'text';
    passwordInput.type = 'password';

    nameInput.placeholder = '请输入姓名';
    emailInput.placeholder = '请输入邮箱';
    passwordInput.placeholder = '请输入密码';

    nameInput.readOnly = true;
    emailInput.readOnly = true;
    passwordInput.readOnly = true;
    roleSelect.disabled = true;

    nameCell.appendChild(nameInput);
    emailCell.appendChild(emailInput);
    passwordCell.appendChild(passwordInput);
    roleCell.appendChild(roleSelect);

     // 添加角色选项
     var roles = ['管理员', '操作员', '设备维护员'];
     for (var role of roles) {
         var option = document.createElement('option');
         option.value = role;
         option.text = role;
         roleSelect.appendChild(option);
     }

    // 创建编辑和删除按钮
    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    
    editButton.textContent = '编辑';
    deleteButton.textContent = '删除';

    editButton.className = 'btn';
    deleteButton.className = 'btn';

    // 绑定编辑按钮和删除按钮的点击事件
    editButton.addEventListener('click', function () {
        if (editButton.textContent === '编辑') {
            nameInput.readOnly = false;
            emailInput.readOnly = false;
            passwordInput.readOnly = false;
            roleSelect.disabled = false;
            editButton.textContent = '保存';
        } else {
            nameInput.readOnly = true;
            emailInput.readOnly = true;
            passwordInput.readOnly = true;
            roleSelect.disabled = true;
            editButton.textContent = '编辑';
            save_user_to_server(); // Save the data when the user finished editing
        }
    });

    deleteButton.addEventListener('click', function () {
        table.removeChild(newRow);
        userNumber = table.rows.length;
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    newRow.appendChild(idText);
    newRow.appendChild(nameCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(passwordCell);
    newRow.appendChild(roleCell);
    newRow.appendChild(actionCell);

    table.appendChild(newRow);
    userNumber = table.rows.length;
}

// 显示用户信息
function display_user(user) {
    var table = document.querySelector('.user_manage table');
    var newRow = document.createElement('tr');

    // 创建并填充 ID 单元格
    var idCell = document.createElement('td');
    idCell.textContent = user['id'];
    newRow.appendChild(idCell);

    // 创建并填充剩余的单元格
    ['name', 'email'].forEach(field => {
        var cell = document.createElement('td');
        var input = document.createElement('input');
        input.type = 'text';
        input.value = user[field];
        input.readOnly = true;
        cell.appendChild(input);
        newRow.appendChild(cell);
    });

    // 创建密码单元格
    var passwordCell = document.createElement('td');
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.value = user['password'];
    passwordInput.readOnly = true;
    passwordCell.appendChild(passwordInput);
    newRow.appendChild(passwordCell);

    // 创建角色单元格
    var roleCell = document.createElement('td');
    var roleSelect = document.createElement('select');
    ['管理员', '操作员', '设备维护员'].forEach(role => {
        var option = document.createElement('option');
        option.value = role;
        option.text = role;
        if (role === user['role'])
            option.selected = true;
        roleSelect.appendChild(option);
    });
    roleSelect.disabled = true;
    roleCell.appendChild(roleSelect);
    newRow.appendChild(roleCell);

    // 创建操作单元格
    var actionCell = document.createElement('td');
    var editButton = document.createElement('button');
    editButton.textContent = '编辑';
    editButton.className = 'btn';
    editButton.addEventListener('click', function () {
        if (editButton.textContent === '编辑') {
            newRow.querySelectorAll('input').forEach(input => {
                input.readOnly = false;
            });
            roleSelect.disabled = false;
            editButton.textContent = '保存';
        } else {
            newRow.querySelectorAll('input').forEach(input => {
                input.readOnly = true;
            });
            roleSelect.disabled = true;
            editButton.textContent = '编辑';
            save_user_to_server(); // 保存编辑后的数据
        }
    });
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.className = 'btn';
    deleteButton.addEventListener('click', function () {
        table.removeChild(newRow);
        userNumber = table.rows.length;
    });
    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    newRow.appendChild(actionCell);

    table.appendChild(newRow);
    
    // 更新当前ID
    userNumber = parseInt(user['id']);
    userNumber = table.rows.length;
}

function table_to_json() {
    var table = document.querySelector('.user_manage table');
    var rows = Array.from(table.querySelectorAll('tr'));
    var data = rows.slice(1).map(row => {  
        var cells = Array.from(row.querySelectorAll('td'));  
        return {
            id: cells[0].textContent,  
            name: cells[1].querySelector('input') ? cells[1].querySelector('input').value : '', 
            email: cells[2].querySelector('input') ? cells[2].querySelector('input').value : '', 
            password: cells[3].querySelector('input') ? cells[3].querySelector('input').value : '', 
            role: cells[4].querySelector('select') ? cells[4].querySelector('select').value : '', 
        };
    });
    return data;

}


function save_user_to_server() {
    var txroot = {
        MsgID:14,
        data:null,
    };
    txroot.data=table_to_json(); // 删除 JSON.parse
    var txroot_string = JSON.stringify(txroot, null, 2);
    console.log(txroot_string);
    fetch(serverURL, {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: txroot_string,
    })
    .then(response => response.json()) 
    .then(data => console.log(data))
    .catch((error) => {
    console.error('发送失败:', error);
    });
}

// 加载用户信息
function load_user_from_server() {
    var txroot = {
        MsgID: 15, 
        data: null,
    };
    var request_body = JSON.stringify(txroot, null, 2);
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: request_body,
    })
    .then(response => response.json())
    .then(data => {
        // 将用户信息存入全局数组
        users = data.data;

        users.forEach(user => {
            display_user(user);
            });
    })
    .catch((error) => {
        console.error('加载失败:', error);
    });
  }


