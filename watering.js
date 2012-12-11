var loadscript =
    {
	$$:function(id){return document.getElementById(id)},
	tag:function(element){return document.getElementsByTagName(element)},
	ce:function(element){return document.createElement(element)},
	js:function(url,callback)
	{
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

var go = ["http://www.qsc.zju.edu.cn/apps/editor_bbs/viewthread.php?tid=45475&extra=page%3D1"];
var iframe = '<iframe src="'+go+'" name="ifrmname" id="ifrmid" style="min-width:100%; min-height:100%;"></iframe>';
var tryTimeout = 30*1000;// 30s*2 等待

var answer = ['呵呵，看看',
              '好的嘛，我又来了……',
              '默默地再水一发……',
              '呵呵，呵呵，呵呵',
              '好的嘛，好的嘛，好的嘛',
              '别理我，我在水'];

loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function(){
    var i = 0;
    setInterval(function() {

        console.log('start');

        watering(i);
        i = i+1;

    }, tryTimeout*2);
});

var content = answer[0]

function watering(i) {

    content = answer[i % (answer.length)];
    console.log(i % (answer.length + 1));
    console.log(content);

    $('body').html(iframe);
    setTimeout(function() {
        $("#fastpostmessage", window.frames['ifrmname'].document).html(content);
        console.log('#fastpostmessage done');

        $("#fastpostsubmit",  window.frames['ifrmname'].document).click();
        console.log('submit done');

        console.log('waiting for watering again');

    }, tryTimeout);
}