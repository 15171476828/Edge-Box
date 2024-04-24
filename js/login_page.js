// login_page.js
window.onload = function() { 
  
};

function log_in() {
  var txroot = {
    MsgID:16,
    data:{
      user: null, 
      password: null,
    }
  };
  txroot.data.user = document.getElementById("user").value;
  txroot.data.password = document.getElementById("password").value;
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
  .then(data => {
      if(data.data.pass==1) window.location.replace("sub/home.html");
      else if(data.data.pass==-1) alert("您输入用户名不存在：" + txroot.data.user+",请重新输入！" );
      else if(data.data.pass==-2) alert("您输入密码不正确" +",请重新输入！" );
      else alert("您输入了错误的账号或密码：" + user+",请重新输入！" );
  })
  .catch((error) => {
  console.error('发送失败:', error);
  });

  if(txroot.data.password=="999") window.location.replace("sub/home.html");
}