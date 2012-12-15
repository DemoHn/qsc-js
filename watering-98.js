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

    var useCurrentUser = false;
    if(!users) {
        useCurrentUser = true;
    }
    console.log('use Current User: '+useCurrentUser);


}

function switchUser() {

    // logout

    // login
}

function autoPost() {

}


// 从localStroage读取users 和 targetPosts

var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : false;
var targetPosts = localStorage.getItem('targetPosts') ? JSON.parse(localStorage.getItem('targetPosts')) : false;



if(!targetPosts) {
    console.log('!targetPosts');
    console.log('requre: Watering-98-init.js');

    loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function() {
        console.log('jQuery Done');
        loadscript.js("https://github.com/zenozeng/qsc-js/raw/master/watering-98-init.js", function () {
            console.log('watering-98-init.js Done');
        });
    });

} else {
    loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function() {
        console.log('jQuery Done');
        init();
    });
}