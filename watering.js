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


function getMoreFlowersToWater(url, myCallback) {

    iframe = '<iframe src="'+url+'" name="flower" id="ifrmid" style="min-width:100%; min-height:100%;"></iframe>';
    $('body').html(iframe);

    setTimeout(function () {
        console.log('getting more flowers to water');
        $('body', window.frames['flower'].document).find('.subject').each(function() {


            // 绕过置顶
            if($(this).parent().parent().attr('id') &&
               $(this).parent().parent().attr('id').indexOf('normalthread') == -1)
              return;

            var href = $(this).find('span  a').attr('href');

            if(!href)
              return;

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
                  leaveSleep:60000
              }
            ]);
            console.log('ADD  '+href);
        });
        myCallback();
    }, 25000);
}

var j;
function watering(i) {

    console.log('TRY  [FOR]  '+i);

    j = getRandom(actionArr.length) - 1;

    action = actionArr[j][i % (actionArr[j].length)];
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
        leaveSleep:60000
    }
  ]
];


var go,iframe,content,action;
var i = 0;

var answer = ['呵呵，wo 就看看……',
              '好的嘛，我又来酱油了……',
              '默默地再水一发，然后消失……',
              '呵呵，呵呵，呵呵',
              '好的嘛，好的嘛，好的嘛',
              '别理我，我默默在水'];

console.log('loading jQuery');

loadscript.js("http://code.jquery.com/jquery-1.8.3.min.js", function(){
    console.log('jQuery Done');
    getMoreFlowersToWater(
      'http://www.qsc.zju.edu.cn/apps/editor_bbs/forumdisplay.php?fid=277',
      function() {
          watering(i);
      });
});
