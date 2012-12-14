// watering script by Zeno Zeng
// qsc浇花脚本


console.log('QSC watering script by Zeno Zeng');

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

function getRandom(n){return Math.floor(Math.random()*n+1)}

var action = [
  {
      url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/',
      action:false,
      minsleep:1000
  },
  {
      url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/forumdisplay.php?fid=210',
      action:false,
      minsleep:2000
  },
  {
      url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/viewthread.php?tid=45475&extra=page%3D1',
      action:true,
      minsleep:1000
  }
];

var go,iframe,content;
var i = 0;

var answer = ['呵呵，看看',
              '好的嘛，我又来了……',
              '默默地再水一发……',
              '呵呵，呵呵，呵呵',
              '好的嘛，好的嘛，好的嘛',
              '别理我，我在水'];



console.log('loading jQuery');

loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function(){
    console.log('jQuery Done');
    watering(i);
});


function watering(i) {

    go = action[i % (action.length)]['url'];
    iframe = '<iframe src="'+go+'" name="ifrmname" id="ifrmid" style="min-width:100%; min-height:100%;"></iframe>';

    console.log(iframe);

    content = answer[getRandom(answer.length) - 1];

    if(iframe)
      $('body').html(iframe);
    
    setTimeout(function() {
        $("#fastpostmessage", window.frames['ifrmname'].document).html(content);
        console.log('#fastpostmessage done');

        $("#fastpostsubmit",  window.frames['ifrmname'].document).click();
        console.log('submit done');

        console.log('waiting for watering again');

    }, getRandom(30000)+30000);
}