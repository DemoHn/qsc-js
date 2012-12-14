// watering script by Zeno Zeng
// qsc浇花脚本

//todo: 多路线支持

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


function getMoreFlowersToWater(url, myCallback) {

    iframe = '<iframe src="'+go+'" name="flower" id="ifrmid" style="min-width:100%; min-height:100%;"></iframe>';
    $('body').html(iframe);

    setTimeout(function () {
        $('body', window.frames['flower'].document).find('.subject.common').each(function() {
            var href = $(this).find('span  a').attr('href');
            actionArr.push([
              {
                  url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/',
                  action:false,
                  postSleep:0,
                  leaveSleep:10000
              },
              {
                  url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/forumdisplay.php?fid=4',
                  action:false,
                  postSleep:0,
                  leaveSleep:10000
              },
              {
                  url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/forumdisplay.php?fid=277&page=1',
                  action:false,
                  postSleep:0,
                  leaveSleep:10000
              },
              {
                  url:href,
                  action:true,
                  postSleep:25000,
                  leaveSleep:50000
              }
            ]);
            console.log('ADD  '+href);
        });
        myCallback();
    }, 15000);
}


function watering(i) {

    action = actionArr[0][i % (actionArr[0].length)];
    go = action['url'];

    console.log('go to '+go);

    content = answer[getRandom(answer.length) - 1];

    iframe = '<iframe src="'+go+'" name="ifrmname" id="ifrmid" style="min-width:100%; min-height:100%;"></iframe>';
    $('body').html(iframe);

    if(action['action']) {
        setTimeout(function() {
            console.log('POSTING  [AT]  ' + new Date);

            $("#fastpostmessage", window.frames['ifrmname'].document).html(content);
            console.log('#fastpostmessage done');

            $("#fastpostsubmit",  window.frames['ifrmname'].document).click();
            console.log('submit done');

            console.log('waiting for watering again');

        }, getRandom(action['postSleep'])+action['postSleep']);
    }

    setTimeout(function() {
        console.log('LEAVING  [AT]  ' + new Date);

        i = i+1;
        watering(i);
    }, getRandom(action['leaveSleep'])+action['leaveSleep']);
}

// Attention: leaveSleep should >= 2*postSleep

var actionArr = [
  [
    {
        url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/',
        action:false,
        postSleep:0,
        leaveSleep:10000
    },
    {
        url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/forumdisplay.php?fid=210',
        action:false,
        postSleep:0,
        leaveSleep:10000
    },
    {
        url:'http://www.qsc.zju.edu.cn/apps/editor_bbs/viewthread.php?tid=45475&extra=page%3D1',
        action:true,
        postSleep:25000,
        leaveSleep:50000
    }
  ]
];


var go,iframe,content,action;
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
    getMoreFlowersToWater(
      'http://www.qsc.zju.edu.cn/apps/editor_bbs/forumdisplay.php?fid=277',
      function() {
          watering(i);
      });
});
