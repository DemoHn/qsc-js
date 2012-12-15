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
$('body').append('<div style="opacity:.8;border-radius:8px;box-shadow: 0 0 15px #777;background:#fff;position:fixed;width:600px;height:500px;top:50%;left:50%;margin-left:-300px;margin-top:-250px;z-index:9999;">hello</div>');

// 将这些东西写入localStroage
localStorage.setItem('targetPosts', JSON.stringify(targetPosts));

if(!useCurrentUser)
  localStorage.setItem('users', JSON.stringify(users));