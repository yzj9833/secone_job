//周免英雄
var FreeHeroFun = function(){
  if(FreeHeroIndexData.length>1){
    var datas = FreeHeroIndexData[1],
        Times = '<b>'+ decodeURIComponent(datas.sTitle)+'</b>',
        sID = decodeURIComponent(datas.sSubContent).split('|'),
        thisID = '',
        thisCount = 0,
        Wth = 0,
        sUrl = 'http://game.gtimg.cn/images/yxzj/img201606/heroimg/',
        hUrl = 'http://pvp.qq.com/web201605/herodetail/',
        Htmls ='';
    for (var i = 0; i < sID.length-1; i++) {
      if(i==0){
        thisID =sID[i]+'/'+ sID[i] + '-freehover.png';
        thisCount = 0;
      }else{
        thisID =sID[i]+'/'+sID[i] + '.jpg';
      }
      Htmls += '<li><a href="'+hUrl+sID[i] + '.shtml'+'" taget="_blank" onclick="pgvSendClick({hottag:\'main.freehero.hero'+i+'\'});"><img data-id="'+sID[i]+'" src="'+sUrl+thisID+'" width="69" height="69"></a></li>';
    };
    $('#FreeHeros-Title').html(Times);
    $('#FreeHeros-Cont').html(Htmls);
    $("#FreeHeros-Cont li img").eq(0).width(224);
    $("#FreeHeros-Cont li").each(function(){
            $(this).hover(function(){
                var thatC = $("#FreeHeros-Cont li img").eq(thisCount);
                var thatNum = thatC.attr("data-id");
                thatC.attr("src" , sUrl+thatNum+'/'+thatNum+'.jpg');
                thatC.width(69);
                var obj =  $(this).find("img");
                var imgNum = obj.attr("data-id");
                obj.attr("src" , sUrl+imgNum+'/'+imgNum+'-freehover.png');
                obj.width(224);
                thisCount = $(this).index();
            },function(){});
      });
  }
};
    
loadScript("http://pvp.qq.com/webplat/info/news_version3/15592/24091/24992/m15707/index.shtml",function(){FreeHeroFun()});


