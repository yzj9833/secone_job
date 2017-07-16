
$.ajax({
    url:"header.html", //这里是静态页的地址
    type: "GET", //静态页用get方法，否则服务器会抛出405错误
    success: function(msg){
        $(".wrapper").html(msg);
        /**
         * Created by Administrator on 2017/6/23.
         */
        $.ajax({
            type:"GET",
            url:"/hero",
            success:function(data){
                var hero=data;//数组hero
                var freeWeek=[];
                //开头ul标题
                $(function(){
                    var list=[
                        {"url":"http://pvp.qq.com/","title":"官方首页","em":"HOME"},
                        {"url":"http://pvp.qq.com/web201605/item.shtml","title":"游戏资料","em":"DATA"},
                        {"url":"http://pvp.qq.com/web201605/herolist.shtml","title":"攻略中心","em":"RAIDERS"},
                        {"url":"http://pvp.qq.com/match/kpl/?ADTAG=pvp.hi","title":"赛事中心","em":"MATCH"},
                        {"url":"http://bbs.g.qq.com/forum.php?mod=forumdisplay&amp;fid=56891&amp;ADTAG=game.web.yxzj",
                            "title":"社区互动","em":"COMMUNITY"},
                        {"url":"javascript:void(0)","title":"玩家支持","em":"PLAYER"},
                    ];
                    var html="";
                    for(var key in list) {
                        var url=list[key].url;
                        var title=list[key].title;
                        var em=list[key].em;
                        html+=`<li><a title=${title} href=${url} target=_blank>${title}<em>${em}</em></a></li>`;
                    }
                    $(".main-nav").html(html);
                });
                //隐藏列表
                $(function(){
                    $("#J_subNav>ul")
                    var DATA=[
                        ["版本介绍","http://pvp.qq.com/cp/a20170516version/index.htm?ADTAG=pvp.index.nav"],
                        ["游戏介绍","http://pvp.qq.com/web201605/introduce.shtml"],
                        ["英雄资料","http://pvp.qq.com/web201605/herolist.shtml"],
                        ["故事站","javascript:void(0)"],
                        ["游戏壁纸","http://pvp.qq.com/web201605/wallpaper.shtml"]
                    ];
                    var RAIDERS=[
                        ["英雄攻略","http://http://pvp.qq.com/strategy/"],
                        ["视频中心","http://pvp.qq.com/v/"]
                    ];
                    var MATCH=[
                        ["KPL职业联赛","http://pvp.qq.com/match/kpl/"],
                        ["KOC王者城市赛","http://pvp.qq.com/match/city.shtml"],
                        ["QGC夏季联赛","javascript:void(0)"],
                        ["故事站","javascript:void(0)"],
                        ["TGA大奖赛","http://tga.qq.com/match/2016/shouyou/game.html?game=wzry&amp;tga=1"],
                        ["WGC精英赛","javascript:alert('敬请期待')"],
                        ["王者高校赛","http://pvp.qq.com/match/college.shtml"]
                    ];
                    var COMMUNITY=[
                        ["手Q部落","https://buluo.qq.com/p/barindex.html?bid=227061"],
                        ["微信圈子","javascript:void(0)"],
                        ["官方微博","http://weibo.com/heromoba"],
                        ["微信公众号","javascript:void(0)"],
                        ["手Q公众号","javascript:void(0)"]
                    ];
                    var PLAYER=[
                        ["客服专区","javascript:void(0)"],
                        ["礼包兑换","javascript:void(0)"],
                        ["自助服务","https://tool.helper.qq.com/v3/wzry/official_website/index.html"]
                    ];
                    var list=[DATA,RAIDERS,MATCH,COMMUNITY,PLAYER];
                    var html=`<li class=down-nav></li>`;
                    for(var i=0;i<list.length;i++){
                        var lista="";
                        for(var j=0;j<list[i].length;j++){
                            lista+=`<a title=${list[i][j][0]} href="${list[i][j][1]}" target=_blank>
                         ${list[i][j][0]}
                    </a>`;
                        }
                        html+="<li class=down-nav>"+lista+"</li>";
                    }
                    $("#J_subNav .sub-nav-inner").html(html);
                    $(".header-inner").on("mouseover",function(){
                        $("#J_subNav").css({visibility:"visible"})
                    }).on("mouseout",function(){
                        $("#J_subNav").css({visibility:"hidden"})
                    })
                });
                //周免英雄和用户登录
                $(function(){
                    $("#FreeHeros-Title").html("<b>周免英雄</b>(6月19日-6月25日)");
                    for(var i=1;i<7;i++){
                        var arr=[];
                        $.each(hero,function(n,value){
                            if(value.position===i)
                                arr.push(value);
                        });
                        var n=Math.floor(Math.random()*arr.length+1)-1;
                        var id=arr[n].hid;
                        freeWeek.push(id);
                    }
                    var fs=[];
                    $.each(hero,function(n,value){
                        if(value.position===4&&value.hid!==freeWeek[3])
                            fs.push(value);
                    });
                    var n=Math.floor(Math.random()*fs.length+1)-1;
                    var id=fs[n].hid;
                    freeWeek.push(id);
                    var html="";
                    $.each(freeWeek,function(n,value){
                        html+=`<li>
        <a href="http://pvp.qq.com/web201605/herodetail/${value.hid}.shtml" taget="_blank">
        <img data-id="${value}" src="img/hero-img/${value}.jpg" width="69" height="69">
        </a></li>`;

                    });
                    $("#FreeHeros-Cont").html(html);
                    var t=$("#FreeHeros-Cont li a img[data-id]:first").attr("src").lastIndexOf("/");
                    var src=$("#FreeHeros-Cont li a img[data-id]:first").attr("src").substring(0,t);
                    var hid=$("#FreeHeros-Cont li a img[data-id]:first").data().id;
                    $("#FreeHeros-Cont li a img[data-id]:first").attr("src",src+"/"+hid+"-freehover.png").css("width",224);
                    $("#FreeHeros-Cont li a img[data-id]").on("mouseover",function(){
                        var t=$(this).attr("src").lastIndexOf("/");
                        var src=$(this).attr("src").substring(0,t);
                        var hid=$(this).data().id;
                        $(this).attr("src",src+"/"+hid+"-freehover.png").css("width",224);
                        var others=$(this).parent().parent().siblings().children().children();
                        for(var i=0;i<others.length;i++){
                            var t=$(others[i]).attr("src").lastIndexOf("/");
                            var src=$(others[i]).attr("src").substring(0,t);
                            var hid=$(others[i]).data().id;
                            $(others[i]).attr("src",src+"/"+hid+".jpg").removeAttr('style');
                        }
                    });
                    $("#unlogin").show();
                    $("#unlogin").click("a",function(){
                        $("#login_select").show();
                    });

                });
                //登录框
                $(function(){
                    $("#login_select").css({
                        "display":"none",
                        "visibility": "visible",
                        "position": "fixed",
                        "z-index":"9999",
                        "left":"50%",
                        "top": "50%",
                        "margin-top": "-127px",
                        "margin-left": "-265px"
                    }).children().first().on("click",function(){
                        $(this).parent().hide();
                    });
                    $("#wxlogin").click(function(){
                        sessionStorage["uname"]="虞众杰";
                        sessionStorage["uimg"]="yzj.jpg";
                        sessionStorage["ulevel"]="30";
                        sessionStorage.setItem("uid","yzj9833");
                        $("#login_select").hide();
                        $("#unlogin").hide();
                        $(".level-ico").html(sessionStorage["ulevel"]);
                        $(".avatar img").attr("src","img/"+sessionStorage['uimg']);
                        var id=sessionStorage["uid"];
                        if(localStorage[id]!==undefined){
                            $("#logined_selected").show();
                        }else
                            $("#logined_not_selected ").show();
                    });
                    $("#qqlogin").click(function(){
                        sessionStorage["uname"]="虞众杰";
                        sessionStorage["uimg"]="yzj.jpg";
                        sessionStorage["ulevel"]="30";
                        sessionStorage.setItem("uid","yzj9833");
                        var id=sessionStorage["uid"];
                        $("#login_select").hide();
                        $("#unlogin").hide();
                        $(".level-ico").html(sessionStorage["ulevel"]);
                        $(".avatar img").attr("src","img/"+sessionStorage['uimg']);
                        if(localStorage[id]!==undefined){
                            $("#logined_selected").show();
                        }else
                            $("#logined_not_selected ").show();
                    });
                    var id=sessionStorage["uid"];
                    if(!sessionStorage['uid']){
                        $("#logined_selected").hide();
                        $("#logined_not_selected").hide();
                    }else{
                        $(".avatar img").attr("src","img/"+sessionStorage['uimg']);
                        $(".level-ico").html(sessionStorage["ulevel"]);
                        if(localStorage[id]!==undefined){
                            $("#logined_selected").show();
                            $("#unlogin").hide();
                        }else{
                            $("#logined_not_selected").show();
                            $("#unlogin").hide();}
                    }
                    $(".logout_btn").click(function(){
                        sessionStorage.removeItem("uname");
                        sessionStorage.removeItem("uimg");
                        sessionStorage.removeItem("ulevel");
                        sessionStorage.removeItem("uid");
                        $("#logined_selected").hide();
                        $("#logined_not_selected").hide();
                        $("#unlogin").show();
                        $(".avatar img").attr("src","img/avatar1.jpg");
                        $(".level-ico").html(0);
                    });
                    $("#area_select").css({
                        "display": "none",
                        " visibility":"visible",
                        "position":"fixed",
                        "z-index":"9999",
                        "left":"50%",
                        "top":"50%",
                        "margin-top":"-177px",
                        "margin-left":"-265px"
                    });
                    $("#area_select a:first-child").click(function(){
                        $("#area_select").hide();
                    });
                    $(".select_role").click(function(){
                        $("#area_select").show();
                    })
                });
                //每周周免英雄
                $(function () {
                    var ul = $("#JErroTips").next();
                    var html = "";
                    $.each(hero, function (n,value) {
                        html += `<li>
                    <a href="http://pvp.qq.com/web201605/herodetail/${value.hid}.shtml" taget="_blank">
                    <img src="img/hero-img/${value.hid}.jpg" alt="${value.hname}">
                    ${value.hname}</a>
                    </li>`;
                    });
                    ul.html(html);
                });
                //新手推荐英雄
                $(function () {
                    $(".types-ms li").click(function () {
                        var t = $(this);
                        $(this).addClass("current");
                        $(".types-ms li").not(t).removeClass("current");
                        var type = t.data('type');
                        var ptype = t.data('ptype');
                        var ul = $("#JErroTips").next();
                        var html = "";
                        $.each(hero,function (n,value) {
                            if (value.position === type) {
                                html += `<li>
                    <a href="http://pvp.qq.com/web201605/herodetail/${value.hid}.shtml" taget="_blank">
                    <img src="img/hero-img/${value.hid}.jpg" alt="${value.hname}">
                    ${value.hname}</a>
                    </li>`;
                            }
                            else if (type === 0) {
                                html += `<li>
                    <a href="http://pvp.qq.com/web201605/herodetail/${value.hid}.shtml" taget="_blank">
                    <img src="img/hero-img/${value.hid}.jpg" alt="${value.hname}">
                    ${value.hname}</a>
                    </li>`;
                            }
                            else if (ptype === 11) {
                                html = `<li>
                    <a href="http://pvp.qq.com/web201605/herodetail/133.shtml" taget="_blank">
                    <img src="img/hero-img/133.jpg" alt="狄仁杰">
                    狄仁杰</a>
                    </li>
                    <li>
                    <a href="http://pvp.qq.com/web201605/herodetail/112.shtml" taget="_blank">
                    <img src="img/hero-img/112.jpg" alt="鲁班七号">
                    鲁班七号</a>
                    </li>
                    <li>
                    <a href="http://pvp.qq.com/web201605/herodetail/109.shtml" taget="_blank">
                    <img src="img/hero-img/109.jpg" alt="妲己">
                    妲己</a>
                    </li>
                    <li>
                    <a href="http://pvp.qq.com/web201605/herodetail/106.shtml" taget="_blank">
                    <img src="img/hero-img/106.jpg" alt="亚瑟">
                    亚瑟</a>
                    </li>`;
                            }
                            else if (ptype === 10) {
                                for (var i = 0; i < freeWeek.length; i++) {
                                    if (value.hid === freeWeek[i]) {
                                        html += `<li>
                    <a href="http://pvp.qq.com/web201605/herodetail/${value.hid}.shtml" taget="_blank">
                    <img src="img/hero-img/${value.hid}.jpg" alt="${value.hname}">
                    ${value.hname}</a>
                    </li>`;
                                    }
                                }
                            }
                        });
                        ul.html(html);
                    })
                });
                //搜索英雄
                $(function(){
                    $(".heroSearch").bind("input",function(){
                        var search=$(".heroSearch").val();
                        $.ajax({
                            type:"post",
                            url:"/heroSearch",
                            data:{search:search},
                            success:function(data){
                                console.log(data);
                                $(".types-ms li[data-type='0']").addClass("current");
                                if(data.length>0){
                                    var html="";
                                    for(var i=0;i<data.length;i++){
                                        var id=data[i]['id']-1;
                                        html+=`<li>
                                <a href="http://pvp.qq.com/web201605/herodetail/${hero[id]['hid']}.shtml">
                                    <img src="img/hero-img/${hero[id]['hid']}.jpg" width="91px" alt="${hero[id].hname}">
                                     ${hero[id].hname}
                                    </a>
                                    </li>`;
                                    }
                                    $("#hero-list").html(html);
                                }
                                else if(data.length==0)
                                    $("#hero-list").html("");
                            }
                        })
                    })
                });
            }
        })
    }
});
$.ajax( {
    url:"footer.html", //这里是静态页的地址
    type: "GET", //静态页用get方法，否则服务器会抛出405错误
    success: function(data){
        $(".footer-wrap").html(data);}
});