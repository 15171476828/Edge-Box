// tags_cfg.js


window.onload = function() {
    read_status_from_server();
    document.getElementById('import').addEventListener('click', importFromExcel);
    document.getElementById('export').addEventListener('click', exportToExcel);
    read_tags_param_from_server();
    read_current_values_from_server();
    setInterval(read_current_values_from_server, 2000); // 每2秒刷新一次
}


// 设备到寄存器的映射
const deviceToRegisters = {
    "MELSEC_iQ_F": ['D', 'M', 'X', 'Y'],
    "MELSEC_iQ_R": ['D', 'M', 'X', 'Y'],
    "MELSEC_Q": ['D', 'M', 'X', 'Y'],
    "S7_200Smart": ['M', 'Q', 'I', 'DB1', 'DB2', 'DB3'],
    "S7_1200": ['M', 'Q', 'I', 'DB1', 'DB2', 'DB3'],
    'S7_1500': ['M', 'Q', 'I', 'DB1', 'DB2', 'DB3'],
    'NJ': ['D', 'W', 'H', 'CIO'],
    'NX': ['D', 'W', 'H', 'CIO'],
    'CP': ['D', 'W', 'H', 'CIO'],
    'CJ': ['D', 'W', 'H', 'CIO'],
    'KV_Nano': ['DM', 'MR', 'R'],
    'KV_3000': ['DM', 'MR', 'R'],
    'KV_5000': ['DM', 'MR', 'R'],
    'Modbus_Master': ['MB_0X', 'MB_1X', 'MB_3X', 'MB_4X'],
    'Modbus_Slave': ['MB_0X', 'MB_1X', 'MB_3X', 'MB_4X']
}

function updateRegisterOptions(deviceSelect, registerSelect) {
    const device = deviceSelect.value;
    const registers = deviceToRegisters[device] || [];
    console.log(device);
    registerSelect.innerHTML = '';
    for (const register of registers) {
        const option = document.createElement('option');
        option.text = register;
        option.value = register;
        registerSelect.add(option);
    }
}
  

function manually_add_row(){
    const table = document.querySelector('table tbody');
    const rowNumber = table.getElementsByTagName('tr').length + 1;
    const newRow = table.insertRow(-1);
    newRow.innerHTML = `
        <td>${rowNumber}</td>
        <td>
             <select id="device${rowNumber}">
                <option value="${systemStatus.protocol_type}">${systemStatus.device_code}</option>
            </select>
        </td>
        <td contenteditable="true"></td>
        <td>
            <select>
                <option value="ReadOnly">ReadOnly</option>
                <option value="WriteOnly">WriteOnly</option>
                <option value="ReadWrite">ReadWrite</option>
            </select>
        </td>
        <td>
            <select id="register${rowNumber}">
                <option value="D">D</option>
                <option value="M">M</option>
                <option value="X">X</option>
                <option value="Y">Y</option>
            </select>
        </td>
        <td contenteditable="true"></td>
        <td>
            <select onchange="updateDataLength(this)">
                <option value="bool">bool</option>
                <option value="byte">byte</option>
                <option value="int16">int16</option>
                <option value="uint16">uint16</option>
                <option value="int32">int32</option>
                <option value="uint32">uint32</option>
                <option value="float">float</option>
                <option value="string">string</option>
            </select>
        </td>
        <td contenteditable="true"></td>
        <td></td>
        <td><button class="btn" onclick="deleteRow(this)">删除</button></td>
    `;
    newRow.querySelector('td button').addEventListener('click', function () {
        if (newRow.rowIndex > 0) {
            table.deleteRow(newRow.rowIndex - 1);
            updateRowNumbers();
        }

    });

    const deviceSelect = newRow.querySelector(`#device${rowNumber}`);
    deviceSelect.addEventListener('change', function() {
        updateRegisterOptions(deviceSelect, newRow.querySelector(`#register${rowNumber}`));
    });
    updateRegisterOptions(deviceSelect, newRow.querySelector(`#register${rowNumber}`));

}

function updateDataLength(select) {
    const dataType = select.value;
    const row = select.parentElement.parentElement;
    const dataLengthCell = row.cells[7]; // 选择数据长度的单元格

    switch (dataType) {
        case 'bool':
        case 'byte':
            dataLengthCell.textContent = '1';
            break;
        case 'int16':
        case 'uint16':
            dataLengthCell.textContent = '2';
            break;
        case 'int32':
        case 'uint32':
            dataLengthCell.textContent = '4';
            break;
        case 'float':
            dataLengthCell.textContent = '4';
            break;
        case 'string':
            dataLengthCell.textContent = '20';
            break;
        default:
            dataLengthCell.textContent = '';
            break;
    }
}

function updateRowNumbers() {
    const table = document.querySelector('table tbody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
}

function deleteRow(button) {
    const table = document.querySelector('table tbody');
    const row = button.parentElement.parentElement;
    if (row.rowIndex > 0) {
        table.deleteRow(row.rowIndex - 1);
        updateRowNumbers();
    }
}

function exportToExcel() {
    const table = document.querySelector('table').cloneNode(true);
    const extraRows = table.querySelectorAll('tr.extra-row');
    extraRows.forEach(row => row.remove());

    // 遍历表格的每一行
    Array.from(table.getElementsByTagName('tr')).forEach((row, rowIndex) => {
        if (rowIndex > 0) { // 跳过标题行
            // 获取当前选项的文本内容
            const deviceName = row.cells[1].querySelector('select option:checked').value;
            const methodText = row.cells[3].querySelector('select option:checked').textContent;
            const registerText = row.cells[4].querySelector('select option:checked').textContent;
            const dataTypeText = row.cells[6].querySelector('select option:checked').textContent;

            // 替换方法和数据类型列的内容
            row.cells[1].innerHTML = deviceName;
            row.cells[3].innerHTML = methodText;
            row.cells[4].innerHTML = registerText;
            row.cells[6].innerHTML = dataTypeText;
        }
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'tags_cfg.xlsx');
}

function importFromExcel() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xls,.xlsx';
    fileInput.onchange = function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const table = document.querySelector('table tbody');
            table.innerHTML = '';

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                addRow(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8]);
            }
        };
        reader.readAsBinaryString(file);
    };
    fileInput.click();
}

function addRow(id, deviceName, varName, method, register, address, dataType, dataLength, currentValue) {
    const table = document.querySelector('table tbody');
    const rowNumber = table.getElementsByTagName('tr').length + 1;
    const newRow = table.insertRow(-1);
    newRow.innerHTML = `
        <td>${id || rowNumber}</td>
        <td>
            <select id="device${rowNumber}" >
            <option value=${systemStatus.protocol_type} ${deviceName === systemStatus.protocol_type ? 'selected' : ''}>${systemStatus.device_code}</option>
            </select>
        </td>
        <td contenteditable="true">${varName || ''}</td>
        <td>
            <select>
                <option value="ReadOnly" ${method === 'ReadOnly' ? 'selected' : ''}>ReadOnly</option>
                <option value="WriteOnly" ${method === 'WriteOnly' ? 'selected' : ''}>WriteOnly</option>
                <option value="ReadWrite" ${method === 'ReadWrite' ? 'selected' : ''}>ReadWrite</option>
            </select>
        </td>
        <td>
            <select id="register${rowNumber}">
                <option value="D" ${register === 'D' ? 'selected' : ''}>D</option>
                <option value="M" ${register === 'M' ? 'selected' : ''}>M</option>
                <option value="X" ${register === 'X' ? 'selected' : ''}>X</option>
                <option value="Y" ${register === 'Y' ? 'selected' : ''}>Y</option>
                <option value="DB1" ${register === 'DB1' ? 'selected' : ''}>DB1</option>
            </select>
        </td>
        <td contenteditable="true">${address || 0}</td>
        <td>
            <select onchange="updateDataLength(this)">
                <option value="bool" ${dataType === 'bool' ? 'selected' : ''}>bool</option>
                <option value="byte" ${dataType === 'byte' ? 'selected' : ''}>byte</option>
                <option value="int16" ${dataType === 'int16' ? 'selected' : ''}>int16</option>
                <option value="uint16" ${dataType === 'uint16' ? 'selected' : ''}>uint16</option>
                <option value="int32" ${dataType === 'int32' ? 'selected' : ''}>int32</option>
                <option value="uint32" ${dataType === 'uint32' ? 'selected' : ''}>uint32</option>
                <option value="float" ${dataType === 'float' ? 'selected' : ''}>float</option>
                <option value="string" ${dataType === 'string' ? 'selected' : ''}>string</option>
            </select>
        </td>
        <td contenteditable="true">${dataLength || ''}</td>
        <td>${currentValue || 0}</td>
        <td><button class="btn" onclick="deleteRow(this)">删除</button></td>
    `;
    newRow.querySelector('td button').addEventListener('click', function () {
        if (newRow.rowIndex > 0) {
            table.deleteRow(newRow.rowIndex - 1);
            updateRowNumbers();
        }
    });
    const deviceSelect = newRow.querySelector(`#device${rowNumber}`);
    deviceSelect.value = deviceName;
    deviceSelect.addEventListener('change', function() {
        updateRegisterOptions(deviceSelect, newRow.querySelector(`#register${rowNumber}`));
    });
    
}

function table_to_json() {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    const data = [];

    // 遍历表格的每一行
    Array.from(rows).forEach((row, rowIndex) => {
        if (rowIndex > 0) { // 跳过标题行
            const rowData = {
                id: row.cells[0].textContent,
                deviceName:row.cells[1].querySelector('select').value,
                varName: row.cells[2].textContent,
                method: row.cells[3].querySelector('select').value,
                register: row.cells[4].querySelector('select').value,
                address: row.cells[5].textContent,
                dataType: row.cells[6].querySelector('select').value,
                dataLength: row.cells[7].textContent,
                currentValue: row.cells[8].textContent
            };

            data.push(rowData);
        }
    });
    var jsonData = JSON.stringify(data);
    return jsonData;
}

function populateTableFromJSON(jsonData) {
    const table = document.querySelector('table tbody');
    table.innerHTML = '';
    jsonData.forEach(item => {
        addRow(item.id, item.deviceName, item.varName, item.method,item.register, item.address, item.dataType,item.dataLength, item.currentValue);
    });
}

function read_tags_param_from_server(){
    var txroot = {
      MsgID:7,
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
      populateTableFromJSON(data.data);
    })
    .catch((error) => {
      console.error('发送失败:', error);
    });
  }

function write_tags_param_to_server(){
    var txroot = {
        MsgID:8,
        data:null,
      };
    txroot.data=JSON.parse(table_to_json());
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
    .then(data => console.log(data))
    .catch((error) => {
      console.error('发送失败:', error);
    });
  }

  // 请求获取标签当前值
  function read_current_values_from_server() {
    var txroot = {
        MsgID: 11, 
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
        updateCurrentValues(data.data);
    })
    .catch((error) => {
        console.error('获取当前值失败:', error);
    });
}

 // 更新标签当前值
 function updateCurrentValues(data) {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');

    // 遍历表格的每一行
    Array.from(rows).forEach((row, rowIndex) => {
        if (rowIndex > 0) { // 跳过标题行
            const tagData = data.find(item => item.id === parseInt(row.cells[0].textContent.trim(), 10));
            if (tagData) {
                row.cells[8].textContent = tagData.currentValue;
            }
        }
    });
}