// auto up script by Zeno Zeng
// 第一次运行或者需要更改目标或者用户信息请重新运行watering-98-init.js

// 因为98的防范好像比较弱，所以就没有做一些特殊的功能——比如频率摆动、模拟路径之类


// todo: 日志写到一个半透明的div里

var loadscript  = {
    $$:function(id){return document.getElementById(id)},
    tag:function(element){return document.getElementsByTagName(element)},
    ce:function(element){return document.createElement(element)},
    js:function(url,callback)
    {
        var s;
	s = loadscript.ce('script');
	s.type = "text/javascript";
	s.onreadystatechange = ready;
	s.onerror = s.onload = callback;
	s.src = url;
	loadscript.tag('head')[0].appendChild(s);
	function ready(){
	    if (s.readyState == 'loaded' || s.readyState == 'complete') {
		callback();
	    }
	};
    }
}


function init() {
    console.log('INIT');

    $('body').append('<div id="qsc-98-config" style="opacity:.8;border-radius:8px;box-shadow: 0 0 15px #000;background:#000;color:#fff;position:fixed;width:600px;height:500px;top:50%;left:50%;margin-left:-300px;margin-top:-250px;z-index:9999;"><div style="padding:3em;">请按照下面示例的格式输入，任意多个都可以，但要遵照格式。<div id="done" style="color:#000;float:right;background:#fff;border-radius:5px;padding:1em;margin-top:-1.5em;cursor:pointer;">DONE</div><br><br><br><input type="checkbox" style="float:left;"/><div style="float:left;">用且仅用当前已登录用户发帖</div><br><br><br>用户及密码（若勾选了上面的，不用管）<br><br><textarea id="users" style="border-radius:5px;padding:1em;outline:none;width:90%;height:5em;">用户一\n用户一密码\n用户二\n用户二密码\n</textarea><br><br><br><textarea id="targets" style="width:90%;outline:none;height:5em;border-radius:5px;padding:1em;">帖子一地址\n帖子二地址</textarea><br><br><br><textarea id="contents" style="width:90%;outline:none;height:5em;border-radius:5px;padding:1em;">随机回复内容一\n随机回复内容二</textarea></div></div>');

    // 若存在localStroage则从中读取，并写入上面的弹窗


    $('#done').click(function() {
        // 解析数据

        $('#qsc-98-config').hide();

        if(!users) {
            useCurrentUser = true;
        }

        // 将这些东西写入localStroage
        localStorage.setItem('targetPosts', JSON.stringify(targetPosts));

        if(!useCurrentUser)
          localStorage.setItem('users', JSON.stringify(users));

        start();
    });


    console.log('use Current User: '+useCurrentUser);
}

function start() {
    $('body').append('<div id="log" style="position:fixed;background:#000;top:0;left:0;width:100%;height:100%;"></div>');
    log('Init Done.');
}

function log(content) {
    $('#log').prepend('QSC-Watering-98.js # '+content+'<br>');
}

function switchUser() {

    // logout

    // login
}

function autoPost() {

}


// 只使用当前已登录的账户？ 若为false，则使用users列表中提供的账户
var useCurrentUser = true;

// 这里放帖子的地址
var targetPosts = [];

// var users = [{
//     username:'username',
//     password:'password'
// }];

var users = [];



// 从localStroage读取users 和 targetPosts

loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function() {
    console.log('jQuery Done');
    init();
});