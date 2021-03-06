// auto up script by Zeno Zeng
// 第一次运行或者需要更改目标或者用户信息请重新运行watering-98-init.js

// 因为98的防范好像比较弱，所以就没有做一些特殊的功能——比如频率摆动、模拟路径之类

var i;

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

    $('body').append('<div id="qsc-98-config" style="font-size:12px;line-height:14px;text-align:left;opacity:.8;border-radius:8px;box-shadow: 0 0 15px #000;background:#000;color:#fff;position:fixed;width:600px;height:500px;top:50%;left:50%;margin-left:-300px;margin-top:-250px;z-index:9999;"><div style="padding:3em;">请按照下面示例的格式输入，任意多个都可以，但要遵照格式。<div id="qsc-98-config-done" style="color:#000;float:right;background:#fff;border-radius:5px;padding:1em;margin-top:-1.5em;cursor:pointer;">DONE</div><br><br><br><input type="checkbox" name="qsc-98-config-use-current-user" style="float:left;"/><div style="float:left;margin-top:2px;">用且仅用当前已登录用户发帖</div><br><br><br>用户及密码（若勾选了上面的，不用管）<br><br><textarea id="qsc-98-config-users" style="border-radius:5px;padding:1em;outline:none;width:90%;height:5em;">用户一\n用户一密码\n用户二\n用户二密码\n</textarea><br><br><br><textarea id="qsc-98-config-targets" style="width:90%;outline:none;height:5em;border-radius:5px;padding:1em;">帖子一地址\n帖子二地址</textarea><br><br><br><textarea id="qsc-98-config-answers" style="width:90%;outline:none;height:5em;border-radius:5px;padding:1em;">随机回复内容一\n随机回复内容二</textarea></div></div>');

    // 若存在localStroage则从中读取，并写入上面的弹窗

    var usersLast = localStorage.getItem('users') ? JSON.decode(localStorage.getItem('users')) : false;
    var targetPostsLast = localStorage.getItem('targetPosts') ? JSON.decode(localStorage.getItem('targetPosts')) : false;
    var answersLast = localStorage.getItem('answers') ? JSON.decode(localStorage.getItem('answers')) : false;
    var useCurrentUserLast = localStorage.getItem('useCurrentUser') == "true" ? true : false;

    if(usersLast) {
        var usersLastText = '';
        for(var i=0; i<usersLast.length; i++){
            usersLastText += usersLast[i]['username']+'\n'+usersLast[i]['password']+'\n';
        };
        $('#qsc-98-config-users').val(usersLastText);
    }
    if(answersLast) {
        $('#qsc-98-config-answers').val(answersLast.join('\n'));
    }
    if(targetPostsLast) {
        $('#qsc-98-config-targets').val(targetPostsLast.join('\n'));
    }
    if(useCurrentUserLast) {
        $('input[name="qsc-98-config-use-current-user"]').attr('checked', 'checked');
    }


    $('#qsc-98-config-done').click(function() {
        $('#qsc-98-config').hide();

        useCurrentUser = $('#qsc-98-config input[type=checkbox]:checked').val() == 'on' ? true : false;

        var tmp,i;
        tmp = $('#qsc-98-config-users').val().split('\n');
        for(i=0; i < tmp.length - 1; i = i+2) {
            users.push({username:tmp[i],password:tmp[i+1]});
        }

        targetPosts = $('#qsc-98-config-targets').val().split('\n');

        answers = $('#qsc-98-config-answers').val().split('\n');

        if(!users) {
            useCurrentUser = true;
        }

        if(!useCurrentUser)
          localStorage.setItem('users', JSON.encode(users));
        localStorage.setItem('targetPosts', JSON.encode(targetPosts));
        localStorage.setItem('answers', JSON.encode(answers));
        localStorage.setItem('useCurrentUser', useCurrentUser);

        $('body').append('<div id="qsc-98-log" style="font-weight:bold;font-size:16px;position:fixed;opacity:.9;line-height:2em;color:#fff;background:#000;top:0;left:0;width:100%;height:100%;text-align:left;z-index:9999;padding:3em;"><span style="color:orange">Hello, this is Zeno Zeng\'s qsc-watering-98.js.  Have fun!</span></div>');

        log('target: ' + JSON.encode(targetPosts));
        log('answers: ' + JSON.encode(answers));

        var originalUsername;
        originalUsername = $('td.TopLighNav1 b').html();

        if(useCurrentUser)
          log('User: '+originalUsername);
        else {
            var usernames = [];
            var i;
            for(i=0;i<users.length;i++) {
                usernames.push(users[i]['username']);
            }
            log('Users: ' + JSON.encode(usernames));
        }


        log('Init Done.');

        currentUsername = originalUsername;

        start();
    });


}

function log(content) {
    console.log(content);
    $('#qsc-98-log').prepend('<div class="qsc-98-log" style="display:none;"><span style="color:deepskyblue">'+currentUsername+' # </span>'+content+'</div>');
    $('.qsc-98-log').show(1000);
}

function start() {
    $('body').append('<div id="qsc-98-iframe" style="width:90%;position:fixed;z-index:998;left:0;top:0;"></div>');

    go(0);
}

function go(i) {
    var iframe,url;

    if(i == targetPosts.length)
      i -= targetPosts.length;

    if(i == 0 && !useCurrentUser)
      switchUser();

    // offset略大于下面的login
    setTimeout(function() {
        url = targetPosts[i];
        iframe = '<iframe src="'+url+'" name="qsc-98-iframe-in" id="qsc-98-iframe-in" style="min-width:100%; min-height:100%;"></iframe>';
        $("#qsc-98-iframe").html(iframe);
        log('GOTO '+url);
    }, 10000);


    setTimeout(function() {
        autoPost();
        log('Auto Post');
    }, 20000);

    setTimeout(function() {
        go(i+1);
    }, 30000);
}

function getRandom(n){return Math.floor(Math.random()*n)}
function autoPost() {
    $('#content', window.frames['qsc-98-iframe-in'].document).val(answers.getRandom(answers.length));
    $('input[type="submit"][name="Submit"]', window.frames['qsc-98-iframe-in'].document).click();
}

var userSwitchCount = 0;
function switchUser() {
    var url,iframe,user;

    userSwitchCount = userSwitchCount % users.length;
    user = users[userSwitchCount];
    userSwitchCount += 1;

    url = 'http://hz.cc98.lifetoy.org/login.asp';
    iframe = '<iframe src="'+url+'" name="qsc-98-iframe-in" id="qsc-98-iframe-in" style="min-width:100%; min-height:100%;"></iframe>';
    $("#qsc-98-iframe").html(iframe);

    setTimeout(function() {
        $('#userName', window.frames['qsc-98-iframe-in'].document).val(user.username);
        $('#password', window.frames['qsc-98-iframe-in'].document).val(user.password);
        $('#submit', window.frames['qsc-98-iframe-in'].document).click();
    }, 3000);

    setTimeout(function() {
        currentUsername = $('td.TopLighNav1 b', window.frames['qsc-98-iframe-in'].document).html();
        log('LOGIN');
    }, 8000);
}



var useCurrentUser;
var users = [];
var answers = [];
var targetPosts = [];

var currentUsername = 'ROOT';

if (typeof jQuery == 'undefined') {
    loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function() {
        console.log('jQuery Done');
        init();
    });
} else {
    console.log('jQuery already Loaded');
    init();
}
