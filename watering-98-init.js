// 只使用当前已登录的账户？ 若为false，则使用users列表中提供的账户
var useCurrentUser = true;

// 这里放帖子的地址
var targetPosts = ['目标地址'];

// 这里方用户名和密码
var users = [{
    username:'username',
    password:'password'
}];

// 弹窗，让用户输入上面的设置
$('body').append('<div style="opacity:.8;border-radius:8px;box-shadow: 0 0 15px #000;background:#000;color:#fff;position:fixed;width:600px;height:500px;top:50%;left:50%;margin-left:-300px;margin-top:-250px;z-index:9999;"><div style="padding:3em;">请按照下面示例的格式输入，任意多个都可以，但要遵照格式。<div id="done" style="color:#000;float:right;background:#fff;border-radius:5px;padding:1em;margin-top:-1.5em;cursor:pointer;">DONE</div><br><br><br><br>用户及密码，若清空则使用当前登录用户<br><br><textarea id="users" style="border-radius:5px;padding:1em;outline:none;width:90%;height:8em;">用户一\n用户一密码\n用户二\n用户二密码\n</textarea><br><br>帖子地址<br><br><textarea id="targets" style="width:90%;outline:none;height:8em;border-radius:5px;padding:1em;">帖子一地址\n帖子二地址</textarea></div></div>');

// 将这些东西写入localStroage
localStorage.setItem('targetPosts', JSON.stringify(targetPosts));

if(!useCurrentUser)
  localStorage.setItem('users', JSON.stringify(users));