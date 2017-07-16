/**
 * Created by Administrator on 2017/7/3.
 */
try
{
    var wx_appid = 'wx95a3a4d7c627e07d';
    var appid = '';
    var area = 0;
    var partition=0;
    var roleid='';
    var is_login = 0;
    var nickname = '';
    var log_type = '';
    var G_ROLE_DATA;
    var G_USER_INFO;
    var rankInfo={
        "1":"倔强青铜III",
        "2":"倔强青铜II",
        "3":"倔强青铜I",
        "4":"秩序白银III",
        "5":"秩序白银II",
        "6":"秩序白银I",
        "17":"荣耀黄金IV",
        "7":"荣耀黄金III",
        "8":"荣耀黄金II",
        "9":"荣耀黄金I",
        "18":"尊贵铂金V",
        "19":"尊贵铂金IV",
        "10":"尊贵铂金III",
        "11":"尊贵铂金II",
        "12":"尊贵铂金I",
        "20":"永恒钻石V",
        "21":"永恒钻石IV",
        "13":"永恒钻石III",
        "14":"永恒钻石II",
        "15":"永恒钻石I",
        "16":"最强王者"
    };


    //add by jim
    var loadHeroList = function(callback){
        $.ajax({  //引入herolist的json文件
            type: "get",
            url: "http://pvp.qq.com/web201605/js/herolist.json",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: callback,
            error: function(err) {
                alert('亲，网络繁忙，请稍后再试吧');return false;
            }
        });
    };

    //头像地址替换
    function getHeroHeadById(heroid){
        if(heroid <= 0){
            return '';
        }
        return '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + heroid + '/' + heroid + '.jpg';
    }

    //皮肤图片地址替换
    function getHeroSkinById(heroid,skinid){
        if(heroid <= 0){
            return '';
        }
        return '//game.gtimg.cn/images/yxzj/img201606/heroimg/'+ heroid + '/'+ heroid +'-myskin-'+ skinid +'.jpg';
    }

    //排行榜地址替换
    function getRankImgByGradeLevel(grade_level){
        if(parseInt(grade_level) <= 0){
            return '';
        }
        grade_level = parseInt(grade_level) > 21 ? 21 : parseInt(grade_level);
        return '//game.gtimg.cn/images/yxzj/web201605/page/rank' + parseInt(grade_level) + '.png';
    }

    //获取装备图片
    function getEquipById(equipid){
//        console.log('equipid'+equipid);
        if(equipid < 1){
            return '';
        }
        return '//game.gtimg.cn/images/yxzj/img201606/itemimg/'+ equipid +'.jpg';
    }


    milo.ready(function(){

        need("biz.login", function(LoginManager){
            LoginManager.checkLogin(function(userinfo){
                //已登录
                is_login = 1;
                G_USER_INFO = userinfo;

                //登陆之后隐藏掉登陆框
                $('#unlogin').hide();
                $('#logined_not_selected').show();
                acctype = milo.cookie.get('acctype');
                //微信或者QQ的昵称都可以获取
                log_type = userinfo.logtype;
                if (userinfo.logtype == "wx" || userinfo.logtype == "qq")
                {
                    //用户昵称 userinfo.nickname;
                    nickname = userinfo.nickname.replace('<script>','&lt;script&gt;').replace('</script>','&lt;/script&gt;');
                    if(nickname.length >= 6)
                    {
                        nickname = nickname.substr(0, 6) + '...';
                    }
                    $("#nickname").html(nickname);
                    //$('.info-id label').text(userinfo.nickname);
                    GetPic();
                }
                //1手Q安卓，2手QIOS，3微信安卓，4微信IOS
                var server_select_url = "http://pvp.qq.com/comm-htdocs/js/game_area/yxzj_WX_server_select.js";
                if(userinfo.logtype == "qq"){
                    server_select_url = "http://pvp.qq.com/comm-htdocs/js/game_area/yxzj_SQ_server_select.js";

                    appid = "1104466820";
                }else{
                    appid = "wx95a3a4d7c627e07d";
                }
                include(server_select_url+"?_rand="+Math.random(), function(){
                    checkLoop();
                    $('.select_role').click(function(){
                        TGDialogS('area_select');
                    });
                });

                //TODO:加载大区信息
                var ROLE_KEY = milo.cookie.get('openid');
                if(userinfo.logtype == "qq")
                {
                    ROLE_KEY = milo.cookie.get('uin');
                }
                //var data = {'area':area, 'partition':partition, 'roleid':roleid};
                var data = milo.cookie.get('PVP_PERSONAL_DATA_'+ROLE_KEY);
                //7天过期
                if(data)
                {
                    //console.log(data);
                    G_ROLE_DATA = milo.unSerialize(data);
                    //console.log(G_ROLE_DATA);
                    area = G_ROLE_DATA.areaid;
                    partition = G_ROLE_DATA.sPartition;
                    roleid = G_ROLE_DATA.roleid;

                    $('#logined_not_selected').hide();
                    $('#logined_selected').show();
                    $('#area_info').text(G_ROLE_DATA.rolename + ' [' + G_ROLE_DATA.areaname + ']');
                    $('.info-id label').text(G_ROLE_DATA.rolename);
                    var pathname = window.location.pathname;
                    if(pathname.indexOf("hisrecord") >= 0){
                        GetHisRecord();//历史战绩
                    }else if(pathname.indexOf("artdetail") >= 0){
                        GetHeroSkin();  //我的资产
                    }else{
                        GetGameInfo();  //个人信息
                    }
                }
                else
                {
                    var pathname = window.location.pathname;
                    if(pathname.indexOf("personal") >= 0 || pathname.indexOf("hisrecord") >= 0 || pathname.indexOf("artdetail") >= 0){
                        TGDialogS('area_select');
                    }
                }

                //console.log(userinfo);
            }, function(){
                qqAndwxLoginout();
                //bandQQAndWX();
            });
        });

        $(".logout_btn").on('click', function(){
            qqAndwxLoginout();
            $('#logined_selected').hide();
            $('#logined_not_selected').hide();
            $('#unlogin').hide();
            $('#area_info').text('--');
            $('.avatar img').attr('src', 'http://game.gtimg.cn/images/yxzj/web201605/main/avatar1.jpg');
        });
    });

    //JS获取头像
    function GetPic()
    {
        var image_url = 'http://game.gtimg.cn/images/yxzj/web201605/main/avatar1.jpg';
        if(log_type == 'wx') {
            LoginManager.getUserInfoByWxOpenId({
                "openid":milo.cookie.get("openid"),
                "access_token":milo.cookie.get("access_token")
            },function(wxuser){
                //alert(JSON.stringify(wxuser));
                //console.log(wxuser);
                //image_url = encodeURIComponent(wxuser.headimgurl);
                if(wxuser.headimgurl)
                {
                    image_url = wxuser.headimgurl+'/96/';
                }
                //sNickname = encodeURIComponent(wxuser.nickname);
                $('.avatar img').attr('src', image_url);
                $('.info-pho img').attr('src', image_url);
            });
            //如果登陆类型是wx微信，就直接获取基本信息里的头像
        } else {
            //$("#nickName").html(LoginManager.getUin());
            LoginManager.getUserFace(function(data){
                //image_url = encodeURIComponent(data.userFace);
                if(data.userFace)
                {
                    image_url = data.userFace;
                }
                //console.log(data);
                $('.avatar img').attr('src', image_url);
                $('.info-pho img').attr('src', image_url);
            });
        }
    }

    function qqAndwxLoginout(){
        need("biz.login", function(LoginManager){
            LoginManager.logout();

            milo.cookie.clear('p_skey', 'qq.com', '/');
            milo.cookie.clear('p_uin', 'qq.com', '/');
            milo.cookie.clear('uin', 'qq.com', '/');
            milo.cookie.clear('skey', 'qq.com', '/');


            milo.cookie.clear("IED_LOG_INFO2");
            milo.cookie.clear('IED_LOG_INFO2', 'qq.com', '/');

            milo.cookie.clear("openid", 'qq.com', '/');
            milo.cookie.clear("access_token", 'qq.com', '/');
            milo.cookie.clear("acctype", 'qq.com', '/');
            milo.cookie.clear("appid", 'qq.com', '/');


            milo.cookie.clear("openid");
            milo.cookie.clear("access_token");
            milo.cookie.clear("acctype");
            milo.cookie.clear("appid");

            window["logoutWxCallback"] = function(){
                $("#_overlay_").hide();
                $("#_PopupMsg_").hide();
            }

            var oWxIFrame = document.createElement("iframe");
            oWxIFrame.id = "loginWxIframe";
            oWxIFrame.name = "loginWxIframe";
            oWxIFrame.scrolling="no";
            oWxIFrame.frameBorder ="0";
            oWxIFrame.style.display ="none";
            document.body.appendChild(oWxIFrame);
            oWxIFrame.src="http://apps.game.qq.com/ams/logout_wx.html";

            // 登出qq并且清除game.qq.com下的cookie
            /*window["logoutCallback"] = function(){
             $("#_overlay_").hide();
             $("#_PopupMsg_").hide();
             }*/

            var oIFrame = document.createElement("iframe");
            oIFrame.id = "loginIframe";
            oIFrame.name = "loginIframe";
            oIFrame.scrolling="no";
            oIFrame.frameBorder ="0";
            oIFrame.style.display ="none";
            document.body.appendChild(oIFrame);
            oIFrame.src="http://game.qq.com/act/logout.html?t=1";
            bandQQAndWX();
            //alert('test');
        });
    }

    function bandQQAndWX(){
        need("biz.login", function(LoginManager){
            //绑定登陆弹窗
            $("#qqlogin").on('click', function(){
                LoginManager.login();
            });
            $("#wxlogin").on('click', function(){
                LoginManager.loginByWx({
                    "appId":wx_appid     //游戏在微信的appid
                });
            });
        });
    }

    function checkLoop(userinfo){

        need(["biz.roleselector"],function(RoleSelector){
            //var roleobj = cloneClass(RoleSelector);
            var roleobj = RoleSelector;

            roleobj.init({
                'type' : 'html',
                'gameId' : 'yxzj',
                'isQueryRole' : true,
                'isShutdownSubmit' : false,

                'areaContentId' : 'areaContentId',
                'channelContentId' : 'channelContentId', // 如果用不到可以删除
                //'systemContentId' : 'systemContentId',   // 如果用不到可以删除
                'roleContentId' : 'roleContentId',
                'confirmButtonId' : 'RoleSelectBtn',

                'submitEvent' : function(roleObj){
                    G_ROLE_DATA = roleObj.submitData;
                    //console.log(G_ROLE_DATA);
                    area = G_ROLE_DATA.areaid;
                    partition = G_ROLE_DATA.sPartition;
                    roleid = G_ROLE_DATA.roleid;
                    //TODO:绑定区服信息
                    var ROLE_KEY = milo.cookie.get('openid');
                    if(G_USER_INFO.logtype == "qq")
                    {
                        ROLE_KEY = milo.cookie.get('uin');
                    }
                    milo.cookie.set('PVP_PERSONAL_DATA_'+ROLE_KEY, milo.serialize(G_ROLE_DATA), 60*60*24*7,"pvp.qq.com","/"); //7天过期
                    //console.log('PVP_PERSONAL_DATA_'+ROLE_KEY);

                    $('#logined_not_selected').hide();
                    $('#logined_selected').show();
                    $('#area_info').text(G_ROLE_DATA.rolename + ' [' + G_ROLE_DATA.areaname + ']');
                    $('.info-id label').text(G_ROLE_DATA.rolename);
                    /*
                     amsCfg_262097.sData.sPlatId = roleObj.submitData.sPlatId;
                     amsCfg_262097.sData.sPartition = roleObj.submitData.sPartition;
                     amsCfg_262097.sData.sArea = roleObj.submitData.areaid;
                     amsCfg_262097.sData.sRoleId = roleObj.submitData.roleid;
                     */
                    var pathname = window.location.pathname;
                    if(pathname == '/web201605/hisrecord.shtml'){  //历史战绩
                        GetHisRecord();
                    }else if(pathname == '/web201605/artdetail.shtml'){  //我的资产
                        GetHeroSkin();
                    }else{
                        GetGameInfo();
                    }
                },
                'openEvent' : function(){//打开窗口时执行的方法
                },
                'cancelEvent' : function(){//点击取消的回调方法
                },
                'closeEvent' : function(){//点击关闭的回调方法
                }
            });

            roleobj.show();
        });
    }

    //展示雷达图数据
    function DrawSpider(data)
    {
        //include('http://pvp.qq.com/web201605/js/chart.js', function(loaded){
        for(i in data)
        {
            //data[i] = Math.round(data[i]/10);
            //TODO: 按比例显示
            data[i] = Math.round(parseInt(data[i])/10);
            if(data[i] > 10){
                data[i] = 10;
            }
        }
        console.log(data);

        var dataChart = {
            labels: ["KDA", "生存", "团战", "发育", "输出", "推进"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(79,181,247,0.6)",
                    strokeColor: "rgba(79,181,247,1)",
                    data: [data.kda, data.survive, data.battle, data.grow, data.hurt_hero, data.push]
                    //<!--data : [65,59,90,81,56,55]-->
                }
            ]
        };

        if(document.getElementById("radar")){ // 下面报错，执行时判断下有无此元素(Modify by sonichuang 2017-06-07)
            var ctx = document.getElementById("radar").getContext("2d");
            var myRadarChart = new Chart(ctx).Radar(dataChart,{
                pointDot:true,
                angleLineColor:"rgba(190,201,214,1)",
                scaleLineColor:"rgba(190,201,214,1)",
                pointLabelFontColor:"#999",
                angleShowLineOut:true,
                angleLineWidth : 1,
                scaleLineWidth : 1,
                pointLabelFontSize:"20",
                scaleOverlay:false,
                scaleOverride : true,
                scaleSteps : 5,
                scaleStartValue: 0,
                scaleStepWidth : 2
            });
        }

        //});
    }

    //头部信息
    function GetHeadInfo()
    {
        var url = 'http://mapps.game.qq.com/yxzj/web201605/GetHeroSkin.php?appid='+appid+'&area='+area+'&partition='+partition + '&roleid=' + roleid +'&r='+Math.random();
        include(url, function(loaded){
            if(!loaded || typeof(GetHeroSkinResult) == 'undefined')
            {
                alert('系统繁忙，请稍后再试');
                return;
            }
            //console.log(loaded);
            var result = GetHeroSkinResult;
            if(result.iRet != 0)
            {
                alert(result.sMsg);
                return;
            }

            if(typeof(result.data.history) != 'undefined' && typeof(result.data.hero_skin_list) != 'undefined')
            {
                //总比赛胜场、胜率， 排位塞胜场胜率
                $('.win_count').text(result.data.history.total_win_num);
                $('.hero_count').text(result.data.hero_skin_list.HeroListCount);
                $('.skin_count').text(result.data.hero_skin_list.HeroSkinCount);
            }
        });
    }

    //个人信息
    function GetGameInfo()
    {
        GetHeadInfo();

        var url = 'http://mapps.game.qq.com/yxzj/web201605/GetGameInfo.php?appid='+appid+'&area='+area+'&partition='+partition + '&roleid=' + roleid +'&r='+Math.random();
        include(url, function(loaded){
            if(!loaded || typeof(result) == 'undefined')
            {
                alert('系统繁忙，请稍后再试');
                return;
            }
            //console.log(loaded);
            //console.log(data);
            if(result.iRet != 0)
            {
                alert(result.sMsg);
                return;
            }

            //信誉积分
            if(typeof(result.data.score) != 'undefined')
            {
                $('.sco-dec b').text((result.data.score > 100) ? 100 : result.data.score);
            }

            if(typeof(result.data.idip_info) != 'undefined')
            {
                $('.level-ico').text(result.data.idip_info.pvplevel);
                //微信和手Q图片都无法加载
                //$('.avatar img').attr('src', decodeURIComponent(result.data.idip_info.head_url));
                //$('#nickname').text(decodeURIComponent(result.data.idip_info.charac_name));

                grade_level = (result.data.idip_info.grade_level) ? result.data.idip_info.grade_level : 1;
                //alert(rankInfo[grade_level]);
                $('.grade_level').text(rankInfo[grade_level]);
                var img_level = parseInt(grade_level);
                if(img_level < 1) img_level = 1; //如果没打过排位，使用青铜III图片
                var grade_level_url = getRankImgByGradeLevel(img_level);
                $('.sco-img').attr('src', grade_level_url);
                /* IDIP数据
                 if(result.data.idip_info.play_time >= 0)
                 {
                 var time = Math.floor(result.data.idip_info.play_time/3600);
                 $('.play_time').text(time);
                 }
                 */
                var team = '无战队信息';
                if(result.data.idip_info.team != 0 && result.data.idip_info.team != '')
                {
                    team = decodeURIComponent(result.data.idip_info.team);
                }
                $('.info-id span').text('(' + team + ')');
            }

            if(typeof(result.data.ic_info) != 'undefined')
            {
//                $('.account_value').text(Math.floor(result.data.ic_info.useticket/10));

                /*
                 var quawin_rate = (result.data.ic_info.quacount > 0) ? result.data.ic_info.quawin * 100 / result.data.ic_info.quacount : 0;
                 $('.quawin_rate').text(Math.floor(quawin_rate));
                 $('.qua_count').text(result.data.ic_info.quacount);
                 $('.quawin_count').text(result.data.ic_info.quawin);

                 var total_rate = (result.data.ic_info.totcount > 0) ? result.data.ic_info.totwin * 100 / result.data.ic_info.totcount : 0;
                 $('.total_count').text(result.data.ic_info.totcount);
                 $('.win_count').text(result.data.ic_info.totwin);
                 $('.win_rate').text(Math.floor(total_rate));
                 */

//                if(result.data.ic_info.loadtime >= 0)
//                {
//                    var time = Math.floor(result.data.ic_info.loadtime/3600);
//                    $('.play_time').text(time);
//                }


            }
            //雷达图 数值为1-6
            //data.kda, data.survive, data.battle, data.grow, data.hurt_hero, data.push
            if(typeof(result.data.spider) != 'undefined')
            {
                DrawSpider(result.data.spider);
            }

            //擅长英雄  不需要了，G_HEROES 已删，以后loadHeroList获取
//            if(typeof(result.data.ic_hero_info.herolist) != 'undefined')
//            {
//                var tpl_obj = $('.heroes_tpl');
//                $.each(result.data.ic_hero_info.herolist, function(i, hero){
//                    //console.log(hero);
//                    var tmp = tpl_obj.clone().show();
//                    var img = 'http://ossweb-img.qq.com/images/yxzj/ingame/res/portrait/' + hero.heroid + '.png';
//                    tmp.find('img').attr('src', img); //image
//                    var hero_info = G_HEROES[hero.heroid].split("|");
//                    tmp.find('span').text(hero_info[0]); //英雄名
//                    tmp.find('td:eq(1)').text(hero.usenums); //场次
//                    var rate = 0;
//                    if(hero.usenums > 0)
//                    {
//                        rate = Math.floor(hero.success * 100 / hero.usenums);
//                    }
//                    tmp.find('td:eq(2)').text(rate + '%'); //胜率
//                    tmp.find('td:eq(3)').text((hero.KDA/10).toFixed(1)); //KDA
//                    tpl_obj.parent().append(tmp);
//                });
//            }

            if(typeof(result.data.history) != 'undefined')
            {
                //对战数据
                for(i in result.data.history)
                {
                    result.data.history[i] = parseInt(result.data.history[i]);
                }

                //排位胜率
                var total = result.data.history.ladder_win_num + result.data.history.ladder_lose_num;
                var quawin_rate = (total > 0) ? result.data.history.ladder_win_num * 100 / total : 0;
                $('.quawin_rate').text(quawin_rate.toFixed(1));
                $('.qua_count').text(total);
                $('.quawin_count').text(result.data.history.ladder_win_num);

                //全部比赛胜率
                total = result.data.history.total_win_num + result.data.history.total_lose_num;
                var total_rate = (total > 0) ? result.data.history.total_win_num * 100 / total : 0;
                $('.total_count').text(total);
                $('.win_count').text(result.data.history.total_win_num);
                $('.win_rate').text(total_rate.toFixed(1));

                total = result.data.history['one_vs_one_lose_num'] + result.data.history['one_vs_one_win_num'];
                $('.tr1v1 td:eq(1)').text(total);
                $('.tr1v1 td:eq(2)').text(result.data.history['one_vs_one_win_num']);
                if(total > 0)
                {
                    var rate = Math.floor(result.data.history['one_vs_one_win_num'] * 100 / total);
                    $('.tr1v1 td:eq(3)').text(rate + '%');
                }

                total = result.data.history['three_vs_three_lose_num'] + result.data.history['three_vs_three_win_num'];
                $('.tr3v3 td:eq(1)').text(total);
                $('.tr3v3 td:eq(2)').text(result.data.history['three_vs_three_win_num']);
                if(total > 0)
                {
                    rate = Math.floor(result.data.history['three_vs_three_win_num'] * 100 / total);
                    $('.tr3v3 td:eq(3)').text(rate + '%');
                }

                total = result.data.history['five_vs_five_lose_num'] + result.data.history['five_vs_five_win_num'];
                $('.tr5v5 td:eq(1)').text(total);
                $('.tr5v5 td:eq(2)').text(result.data.history['five_vs_five_win_num']);
                if(total > 0)
                {
                    rate = Math.floor(result.data.history['five_vs_five_win_num'] * 100 / total);
                    $('.tr5v5 td:eq(3)').text(rate + '%');
                }
            }

            //最高记录
            $('.highestwin').text(result.data.ic_info.highestwin);
            $('.highestfail').text(result.data.ic_info.highestfail);
            var win_info = [
                result.data.ic_info.highestkill,
                result.data.ic_info.highestdeath,
                result.data.ic_info.highestassist,
                result.data.ic_info.highestmoney,
                result.data.ic_info.highestexport,
            ];

            var fail_info = [
                result.data.ic_info.highestbear,
                result.data.ic_info.godlike,
                result.data.ic_info.mvp,
                result.data.ic_info.firstblood,
                result.data.ic_info.fivekill,
            ];
            var win_obj = $('.highestwin_info');
            var fail_obj = $('.highestfail_info');
            for(i=0; i < win_info.length; i++)
            {
                win_obj.find('span:eq(' + i + ')').text(win_info[i]);
            }
            for(i=0; i < fail_info.length; i++)
            {
                fail_obj.find('span:eq(' + i + ')').text(fail_info[i]);
            }

            //上周战报, 上周数据及对应最大值
            var last_week = [
                [result.data.ic_info.lastweekwin, 100],
                [result.data.ic_info.lastweekwin, result.data.ic_info.lastweektotal],
                [result.data.ic_info.lastweekkill, 1000],
                [result.data.ic_info.lastweekdeath, 600],
                [result.data.ic_info.lastweekassist, 1200]
            ];
            var last_week_obj = $('.rec-list');
            for(var i=0; i < last_week.length; i++)
            {
                //$('.rec-list').find('li:eq(0) p')
                var tmp_obj = last_week_obj.find('li:eq(' + i + ')');
                if(i==1) //根据胜场计算胜率
                {

                    var win_rate = 0;
                    if(result.data.ic_info.lastweektotal > 0)
                    {
                        win_rate = Math.floor(result.data.ic_info.lastweekwin *100 / result.data.ic_info.lastweektotal);
                    }
                    tmp_obj.find('p span').text(win_rate + '%');
                    tmp_obj.find('p:eq(1)').attr('style', 'width:' + win_rate + '%');
                }
                else
                {
                    var comp_with_max = last_week[i][0] > last_week[i][1] ? last_week[i][1] : last_week[i][0];
                    var rate = Math.ceil(comp_with_max * 100 / last_week[i][1]);

                    tmp_obj.find('p span').text(comp_with_max);
                    tmp_obj.find('p:eq(1)').attr('style', 'width:' + rate + '%');
                }
            }
        });
    }

    //历史战绩
    function GetHisRecord()
    {
        GetHeadInfo();

        var url = 'http://mapps.game.qq.com/yxzj/web201605/GetHisRecord.php?appid='+appid+'&area='+area+'&partition='+partition + '&roleid=' + roleid +'&r='+Math.random();
        include(url, function(loaded){
            if(!loaded || typeof(result) == 'undefined')
            {
                alert('系统繁忙，请稍后再试');
                return;
            }
            //console.log(loaded);
            if(result.iRet != 0)
            {
                alert(result.sMsg);
                return;
            }

            if(typeof(result.data.idip_info) != 'undefined')
            {
                $('.level-ico').text(result.data.idip_info.pvplevel);
                //微信和手Q图片都无法加载
                //$('.avatar img').attr('src', decodeURIComponent(result.data.idip_info.head_url));
                //$('#nickname').text(decodeURIComponent(result.data.idip_info.charac_name));

                grade_level = (result.data.idip_info.grade_level) ? result.data.idip_info.grade_level : 1;
                //alert(rankInfo[grade_level]);
                $('.grade_level').text(rankInfo[grade_level]);
                var img_level = parseInt(grade_level);
                if(img_level < 1) $img_level = 1;
                var grade_level_url = getRankImgByGradeLevel(img_level);
                $('.sco-img').attr('src', grade_level_url);
                /* IDIP数据
                 if(result.data.idip_info.play_time >= 0)
                 {
                 var time = Math.floor(result.data.idip_info.play_time/3600);
                 $('.play_time').text(time);
                 }
                 */
                var team = '无战队信息';
                if(result.data.idip_info.team != 0 && result.data.idip_info.team != '')
                {
                    team = decodeURIComponent(result.data.idip_info.team);
                }
                $('.info-id span').text('(' + team + ')');
            }

            if(typeof(result.data.his_record) != 'undefined')
            {
                //console.log(result.data.his_record);
                //最近一次比赛
                var his_last1 = result.data.his_record[0];
                var his_last10 = result.data.his_record;

                var his_info = 0+"|"+his_last1.GameSeq+"|"+his_last1.GameSvrEntity+"|"+his_last1.RelaySvrEntity+"|"+his_last1.LineType+"|"+his_last1.Camp1Num;
                $("#his_last_linfo1").find(".his_info_arrow").attr("data-id", his_info);
                var img = getHeroHeadById(his_last1.HeroID1);
                $("#his_last_linfo1 .his_headimg").attr("src", img);
                $("#his_last_linfo1 .pvplevel").text("LV."+his_last1.PvpLevel);
                if(his_last1.GameResult == 1){
                    $("#his_last_linfo1 .his_info_m_txt").removeClass("_faltxt").addClass("_suctxt").text("胜利");
                }else{
                    $("#his_last_linfo1 .his_info_m_txt").removeClass("_suctxt").addClass("_faltxt").text("失败");
                }
                //对局模式
                $("#his_last_linfo1 .his_info_m_maptxt").text(his_last1.GameTypeName);
                $("#his_last_linfo1 .gameduration").text(Math.round(parseInt(his_last1.UsedTime)/60));
                var kda = his_last1.KDA;
                if(his_last1.GradeOfRank < 1) his_last1.GradeOfRank = 1;
                var grade_level_url = getRankImgByGradeLevel(his_last1.GradeOfRank);
                $("#his_last_linfo1 .his_info_dan").attr("src", grade_level_url);
                $("#his_last_linfo1 .info_kda").text(" KDA:"+kda.toFixed(1));
                $("#his_last_linfo1 .killnum").text(his_last1.KillCnt);
                $("#his_last_linfo1 .deathnum").text(his_last1.DeadCnt);
                $("#his_last_linfo1 .assistnum").text(his_last1.AssistCnt);
                $("#his_last_linfo1 .equipment_time").text(his_last1.GameSeqDateTime);
                //最终出装
                var equip_str = his_last1.FinalInBattleEquipStr.split(",");
                var equip_str_html = '';
                if(equip_str.length > 0){
                    $.each(equip_str, function(k, v){
                        v = v.split('+');
                        if(v[0] > 0){
                            var equip_url = getEquipById(v[0]);
                            equip_str_html += '<img width="50" height="50" src="'+equip_url+'">';
                        }
                    });
                }
                $("#his_last_linfo1 .equipment_imglist").html(equip_str_html);
                //评分
                $("#his_last_linfo1 .mvp_num").text(his_last1.score);
                //是否MVP
                if(his_last1.MvpCnt == 1){
                    $("#his_last_linfo1 .his_info_mvp").show();
                }else{
                    $("#his_last_linfo1 .his_info_mvp").hide();
                }

                $("#his_last_linfo1").show();

                //历史战绩
                var num = '';
                $.each(his_last10, function(k, v){
                    if(k == 0){
                        return;
                    }
                    num = k;
                    next_num = num + 1;
                    var obj = $("#his_last_game10_"+num).clone(true);
                    obj.attr("id", "his_last_game10_"+next_num);

                    obj.insertAfter("#his_lastgame_detail_"+num);

                    var his_info = num+"|"+v.GameSeq+"|"+v.GameSvrEntity+"|"+v.RelaySvrEntity+"|"+v.LineType+"|"+v.Camp1Num;
                    $('#his_last_game10_'+num).find(".his_info_arrow").attr("data-id", his_info);

                    var obj_detail = $("#his_lastgame_detail_"+num).clone(true);
                    obj_detail.attr("id", "his_lastgame_detail_"+next_num);
                    obj_detail.find(".item_succ_i").attr("id", 'item_i_succ_'+next_num+'_'+1);
                    obj_detail.find(".item_fail_i").attr("id", 'item_i_fail_'+next_num+'_'+1);
                    obj_detail.insertAfter("#his_last_game10_"+next_num);
                    var img = getHeroHeadById(v.HeroID1);
                    $("#his_last_game10_"+num+" .his_headimg").attr("src", img);
                    $("#his_last_game10_"+num+" .pvplevel").text("LV."+v.PvpLevel);
                    if(v.GameResult == 1){
                        $("#his_last_game10_"+num+" .his_info_m_txt").removeClass("_faltxt").addClass("_suctxt").text("胜利");
                    }else{
                        $("#his_last_game10_"+num+" .his_info_m_txt").removeClass("_suctxt").addClass("_faltxt").text("失败");
                    }
                    //对局模式
                    $("#his_last_game10_"+num+" .his_info_m_maptxt").text(v.GameTypeName);
                    $("#his_last_game10_"+num+" .gameduration").text(Math.round(parseInt(v.UsedTime)/60));
                    var kda = v.KDA;
                    if(v.GradeOfRank < 1) v.GradeOfRank = 1;
                    var grade_level_url = getRankImgByGradeLevel(v.GradeOfRank);
                    $("#his_last_game10_"+num+" .his_info_dan").attr("src", grade_level_url);
                    $("#his_last_game10_"+num+" .info_kda").text(" KDA:"+kda.toFixed(1));
                    $("#his_last_game10_"+num+" .killnum").text(v.KillCnt);
                    $("#his_last_game10_"+num+" .deathnum").text(v.DeadCnt);
                    $("#his_last_game10_"+num+" .assistnum").text(v.AssistCnt);
                    $("#his_last_game10_"+num+" .equipment_time").text(v.GameSeqDateTime);
                    //最终出装
                    var equip_str = v.FinalInBattleEquipStr.split(",");
                    var equip_str_html = '';
                    if(equip_str.length > 0){
                        $.each(equip_str, function(kkk, vvv){
                            vvv = vvv.split('+');
                            if(vvv[0] > 0){
                                var equip_url = getEquipById(vvv[0]);
                                equip_str_html += '<img width="50" height="50" src="'+equip_url+'">';
                            }
                        });
                    }
                    $("#his_last_game10_"+num+" .equipment_imglist").html(equip_str_html);
                    //评分
                    $("#his_last_game10_"+num+" .mvp_num").text(v.score);
                    //是否MVP
                    if(v.MvpCnt == 1){
                        $("#his_last_game10_"+num+" .his_info_mvp").show();
                    }else{
                        $("#his_last_game10_"+num+" .his_info_mvp").hide();
                    }

                    $("#his_last_game10_"+num).show();
                });

            }
        });
    }

    //历史战绩
    function GetHisRecordDetail(id, gameseq, gamesvrentity, relaysvrentity, linetype, teamnum)
    {
        var url = 'http://mapps.game.qq.com/yxzj/web201605/GetHisRecordDetail.php?appid='+appid+'&area='+area+'&partition='+partition + '&roleid=' + roleid + '&gameseq=' + gameseq + '&gamesvrentity=' + gamesvrentity + '&relaysvrentity=' + relaysvrentity + '&linetype=' + linetype + '&teamnum=' + teamnum + '&r='+Math.random();
        include(url, function(loaded){
            if(!loaded || typeof(result) == 'undefined')
            {
                alert('系统繁忙，请稍后再试');
                return;
            }
            //console.log(loaded);
            if(result.iRet != 0)
            {
                alert(result.sMsg);
                return;
            }

            if(typeof(result.data.his_record_detail) != 'undefined')
            {
                //标志已加载
                $('#his_lastgame_detail_'+id).attr('data-id', '1');

                //console.log(result.data.his_record_detail);
                his_record_detail = result.data.his_record_detail;
                his_record_detail_alldata = result.data.his_record_detail_alldata;

                var succ_num = 1;
                var fail_num = 1;
                $.each(his_record_detail, function(k,v){
                    if(v.GameResult == 1){  //胜利方
                        next_succ_num = succ_num+1;
                        var obj = $('#item_i_succ_'+id+'_'+succ_num).clone(true);
                        obj.attr('id', 'item_i_succ_'+id+'_'+next_succ_num);
                        obj.insertAfter('#item_i_succ_'+id+'_'+succ_num);
                        var hero_img = getHeroHeadById(v.HeroID1);
                        $('#item_i_succ_'+id+'_'+succ_num+' .item_herohead').attr('src', hero_img);
                        //玩家名称
                        $('#item_i_succ_'+id+'_'+succ_num+' .item_name').text(decodeURIComponent(v.AcntName));
                        //
                        $('#item_i_succ_'+id+'_'+succ_num+' .item_money').text('金钱：'+v.TotalInBattleCoin);
                        $('#item_i_succ_'+id+'_'+succ_num+' .killnum').text(v.KillCnt+'杀');
                        $('#item_i_succ_'+id+'_'+succ_num+' .deathnum').text(v.DeadCnt+'死');
                        $('#item_i_succ_'+id+'_'+succ_num+' .assistnum').text(v.AssistCnt+'助攻');
                        //最终出装
                        var equip_str = v.FinalInBattleEquipStr.split(",");
                        var equip_str_html = '';
                        if(equip_str.length > 0){
                            $.each(equip_str, function(kkk, vvv){
                                vvv = vvv.split('+');
                                if(vvv[0] > 0){
                                    var equip_url = getEquipById(vvv[0]);
                                    equip_str_html += '<img width="50" height="50" src="'+equip_url+'">';
                                }
                            });
                        }
                        //MVP评分
                        if(v.MvpCnt > 0){
                            $('#item_i_succ_'+id+'_'+succ_num+' .icon_inMVP').html('<img class="his_info_mvp" width="70" height="64" src="http://game.gtimg.cn/images/yxzj/web201605/page/icon_MVP2.png"><span class="mvp_innum">'+v.MvpScore+'</span>');
                        }else{
                            $('#item_i_succ_'+id+'_'+succ_num+' .icon_inMVP').html('<img class="his_info_mvp" width="70" height="64" src="http://game.gtimg.cn/images/yxzj/web201605/page/icon_MVP3.png"><span class="mvp_innum _innormal">'+v.MvpScore+'</span>');
                        }
                        $('#item_i_succ_'+id+'_'+succ_num+' .item_equipment').html(equip_str_html);

                        //小图标
                        var his_info_r_attr_html = '';
                        for(i=1;i<=8;i++){
                            if(v['act0'+i] == 1){
                                his_info_r_attr_html += '<i class="r_attr _at0'+i+'"></i>';
                            }
                        }
                        if(v['at_3kill'] == 1){  //三杀
                            his_info_r_attr_html += '<i class="r_attr _at_3kill"></i>';
                        }
                        if(v['at_4kill'] == 1){  //四杀
                            his_info_r_attr_html += '<i class="r_attr _at_4kill"></i>';
                        }
                        if(v['at_5kill'] == 1){  //五杀
                            his_info_r_attr_html += '<i class="r_attr _at_5kill"></i>';
                        }
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_info_r_attr').html(his_info_r_attr_html);

                        //浮层
                        var alldata = his_record_detail_alldata[v.GameResult];
                        var hero_img = getHeroHeadById(v.HeroID1);
                        $('#item_i_succ_'+id+'_'+succ_num+" .his_roleimg").attr('src', hero_img);

                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_money p:eq(0)').text('获得金钱：'+v.TotalInBattleCoin);
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_allout p:eq(0)').text('总输出：'+v.TotalHurtCnt);
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_allout p:eq(1)').text('总输出百分比：'+Math.round((v.TotalHurtCnt/alldata.TotalHurtCnt)*100)+'%');
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_tohurt p:eq(0)').text('对英雄伤害：'+v.TotalHurtHeroCnt);
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_tohurt p:eq(1)').text('对英雄伤害百分比：'+Math.round((v.TotalHurtHeroCnt/alldata.TotalHurtHeroCnt)*100)+'%');
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_hurt p:eq(0)').text('承受伤害：'+v.TotalBeHurtCnt);
                        $('#item_i_succ_'+id+'_'+succ_num+' .his_role_hurt p:eq(1)').text('承受伤害百分比：'+Math.round((v.TotalBeHurtCnt/alldata.TotalBeHurtCnt)*100)+'%');

                        $('#item_i_succ_'+id+'_'+succ_num).show();

                        succ_num++;
                    }else{  //失败方
                        next_fail_num = fail_num+1;
                        var obj = $('#item_i_fail_'+id+'_'+fail_num).clone(true);
                        obj.attr('id', 'item_i_fail_'+id+'_'+next_fail_num);

                        obj.insertAfter('#item_i_fail_'+id+'_'+fail_num);
                        var hero_img = getHeroHeadById(v.HeroID1);
                        $('#item_i_fail_'+id+'_'+fail_num+" .item_herohead").attr('src', hero_img);
                        //玩家名称
                        $('#item_i_fail_'+id+'_'+fail_num+' .item_name').text(decodeURIComponent(v.AcntName));
                        //
                        $('#item_i_fail_'+id+'_'+fail_num+' .item_money').text('金钱：'+v.TotalInBattleCoin);
                        $('#item_i_fail_'+id+'_'+fail_num+' .killnum').text(v.KillCnt+'杀');
                        $('#item_i_fail_'+id+'_'+fail_num+' .deathnum').text(v.DeadCnt+'死');
                        $('#item_i_fail_'+id+'_'+fail_num+' .assistnum').text(v.AssistCnt+'助攻');
                        //最终出装
                        var equip_str = v.FinalInBattleEquipStr.split(",");
                        var equip_str_html = '';
                        if(equip_str.length > 0){
                            $.each(equip_str, function(kkk, vvv){
                                vvv = vvv.split('+');
                                if(vvv[0] > 0){
                                    var equip_url = getEquipById(vvv[0]);
                                    equip_str_html += '<img width="50" height="50" src="'+equip_url+'">';
                                }
                            });
                        }
                        //MVP评分
                        if(v.LoseMvp > 0){
                            $('#item_i_fail_'+id+'_'+fail_num+' .icon_inMVP').html('<img class="his_info_mvp" width="70" height="64" src="http://game.gtimg.cn/images/yxzj/web201605/page/icon_MVP2.png"><span class="mvp_innum">'+v.MvpScore+'</span>');
                        }else{
                            $('#item_i_fail_'+id+'_'+fail_num+' .icon_inMVP').html('<img class="his_info_mvp" width="70" height="64" src="http://game.gtimg.cn/images/yxzj/web201605/page/icon_MVP3.png"><span class="mvp_innum _innormal">'+v.MvpScore+'</span>');
                        }
                        $('#item_i_fail_'+id+'_'+fail_num+' .item_equipment').html(equip_str_html);

                        //小图标
                        var his_info_r_attr_html = '';
                        for(i=1;i<=8;i++){
                            if(v['act0'+i] == 1){
                                his_info_r_attr_html += '<i class="r_attr _at0'+i+'"></i>';
                            }
                        }
                        if(v['at_3kill'] == 1){  //三杀
                            his_info_r_attr_html += '<i class="r_attr _at_3kill"></i>';
                        }
                        if(v['at_4kill'] == 1){  //四杀
                            his_info_r_attr_html += '<i class="r_attr _at_4kill"></i>';
                        }
                        if(v['at_5kill'] == 1){  //五杀
                            his_info_r_attr_html += '<i class="r_attr _at_5kill"></i>';
                        }
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_info_r_attr').html(his_info_r_attr_html);

                        //浮层
                        var alldata = his_record_detail_alldata[v.GameResult];
                        var hero_img = getHeroHeadById(v.HeroID1);
                        $('#item_i_fail_'+id+'_'+fail_num+" .his_roleimg").attr('src', hero_img);

                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_money p:eq(0)').text('获得金钱：'+v.TotalInBattleCoin);
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_allout p:eq(0)').text('总输出：'+v.TotalHurtCnt);
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_allout p:eq(1)').text('总输出百分比：'+Math.round((v.TotalHurtCnt/alldata.TotalHurtCnt)*100)+'%');
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_tohurt p:eq(0)').text('对英雄伤害：'+v.TotalHurtHeroCnt);
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_tohurt p:eq(1)').text('对英雄伤害百分比：'+Math.round((v.TotalHurtHeroCnt/alldata.TotalHurtHeroCnt)*100)+'%');
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_hurt p:eq(0)').text('承受伤害：'+v.TotalBeHurtCnt);
                        $('#item_i_fail_'+id+'_'+fail_num+' .his_role_hurt p:eq(1)').text('承受伤害百分比：'+Math.round((v.TotalBeHurtCnt/alldata.TotalBeHurtCnt)*100)+'%');

                        $('#item_i_fail_'+id+'_'+fail_num).show();

                        fail_num++;
                    }

                    $('.item_i').hover(function(){
                        $(this).find('.his_detailcont').show();
                    },function(){
                        $(this).find('.his_detailcont').hide();
                    });
                });

            }
        });
    }

    var lastgame_arrow=$('.his_info_arrow');
    function showRecord(_this,id){
        id = id.split("|");

        if(id.length == 6){
            var gameseq = id[1];
            var gamesvrentity = id[2];
            var relaysvrentity = id[3];
            var linetype = id[4];
            var teamnumm = id[5];
            id = id[0];
        }else{
            return false;
        }

        if($(_this).hasClass('arrow_up')){
            //判断是否已加载过
            if($('#his_lastgame_detail_'+id).attr('data-id') == 1){
            }else{
                GetHisRecordDetail(id, gameseq, gamesvrentity, relaysvrentity, linetype, teamnumm);
            }

            $(_this).removeClass('arrow_up');
            $(_this).addClass('arrow_down');
            $('#his_lastgame_detail_'+id).show();
        }else{
            $(_this).addClass('arrow_up');
            $(_this).removeClass('arrow_down');
            $('#his_lastgame_detail_'+id).hide();
        }
    }
    lastgame_arrow.on('click',function(){
        var id=$(this).attr('data-id');
        showRecord(this,id);
    });

    //我的资产
    function GetHeroSkin()
    {
        var url = 'http://mapps.game.qq.com/yxzj/web201605/GetHeroSkin.php?appid='+appid+'&area='+area+'&partition='+partition + '&roleid=' + roleid +'&r='+Math.random();
        include(url, function(loaded){
            if(!loaded || typeof(GetHeroSkinResult) == 'undefined')
            {
                alert('系统繁忙，请稍后再试');
                return;
            }
//            console.log(GetHeroSkinResult);
            var result = GetHeroSkinResult;
            if(result.iRet != 0)
            {
                alert(result.sMsg);
                return;
            }

            if(typeof(result.data.idip_info) != 'undefined')
            {
                $('.level-ico').text(result.data.idip_info.pvplevel);
                //微信和手Q图片都无法加载
                //$('.avatar img').attr('src', decodeURIComponent(result.data.idip_info.head_url));
                //$('#nickname').text(decodeURIComponent(result.data.idip_info.charac_name));

                grade_level = (result.data.idip_info.grade_level) ? result.data.idip_info.grade_level : 1;
                //alert(rankInfo[grade_level]);
                $('.grade_level').text(rankInfo[grade_level]);
                var img_level = parseInt(grade_level);
                if(img_level < 1) $img_level = 1;
                var grade_level_url = getRankImgByGradeLevel(img_level);
                $('.sco-img').attr('src', grade_level_url);
                /* IDIP数据
                 if(result.data.idip_info.play_time >= 0)
                 {
                 var time = Math.floor(result.data.idip_info.play_time/3600);
                 $('.play_time').text(time);
                 }
                 */
                var team = '无战队信息';
                if(result.data.idip_info.team != 0 && result.data.idip_info.team != '')
                {
                    team = decodeURIComponent(result.data.idip_info.team);
                }
                $('.info-id span').text('(' + team + ')');
            }

            if(typeof(result.data.history) != 'undefined' && typeof(result.data.hero_skin_list) != 'undefined')
            {
                //总比赛胜场、胜率， 排位塞胜场胜率
                $('.win_count').text(result.data.history.total_win_num);
                $('.hero_count').text(result.data.hero_skin_list.HeroListCount);
                $('.skin_count').text(result.data.hero_skin_list.HeroSkinCount);
            }

            if(typeof(result.data.hero_skin_list) != 'undefined')
            {
                $("#hero_count").text(result.data.hero_skin_list['HeroListCount']);
//                $("#skin_count").text(result.data.hero_skin_list['HeroSkinCount']);

                var hero_list_str = result.data.hero_skin_list['HeroListStr'];
                var skin_list_str = result.data.hero_skin_list['HeroSkinStr'];

                var hero_list_html = '';
                var hero_skin_html = '';

                //add by jim
                loadHeroList(function(res){ //必须回调或者成功后再执行
                    var ALLHEROANDSKINS = res;
                    $.each(ALLHEROANDSKINS , function(k,v){
                        var gray_class = "";
                        if(!milo.hasValue(hero_list_str, v.ename)){ //加样式
                            gray_class = "toGray";
                        }
                        var head_url = getHeroHeadById(v.ename);
                        hero_list_html += '<li class="'+ gray_class +' hero_location_'+ v.hero_type +'"><img src="'+head_url+'" alt=""><span class="s_hero_name">'+ v.cname +'</span></li>';

                        hero_skin_html += '<li class="hero_skin_list '+ gray_class +' hero_location_'+ v.hero_type +'" id="hero_skin_'+ v.ename +'" style="cursor:pointer;"><img src="'+head_url+'" alt=""><span  class="s_hero_name">'+ v.cname +'</span></li>';
                    });

                    $(".hero_list").html(hero_list_html);
                    $(".hero_skin_list").html(hero_skin_html);

                    //初始化皮肤
                    sel_skin(105);

                    //皮肤选中
                    $(".hero_skin_list").on('click', function(){
                        var id = $(this).attr("id");
                        //console.log(id);
                        if(id != undefined){
                        }else{
                            return false;
                        }
                        id = id.split("_");
                        var hero_id = id['2'];
                        //console.log(skin_list_str[hero_id]);

                        sel_skin(hero_id);
                    });

                    //皮肤选择
                    function sel_skin(hero_id){
                        $.each(ALLHEROANDSKINS , function(key,val){
                            if(val.ename == hero_id){
                                //英雄名称
                                $(".hero_name").text(val.cname);

                                //英雄头像
                                var head_url = getHeroHeadById(val.ename);
                                $(".hero_pic").attr("src", head_url);
                                var all_skins = val.skin_name.split('|');
                                var skin_list_html = "";
                                var skin_count = 0;  //英雄皮肤数量
                                var skin_has_count = 0;  //拥有的皮肤数量
                                var skin_id = -1;
                                $.each(all_skins, function(k, v){ //遍历所有皮肤
//                                    if(v == "敬请期待"){
//                                        return true;
//                                    }
                                    skin_id ++;

                                    skin_count++;      //154-myskin-0.jpg

                                    var has_skin_class = "";
                                    var flag = 0;
                                    if(skin_list_str[hero_id] != undefined){
                                        var temp = skin_list_str[hero_id].split('').reverse().join('');
                                        for(var i=0;i<temp.length;i++){
                                            var tmp = temp.charAt(i);
                                            if(tmp == 1 && k == i){
                                                if(i == 0 && $('#hero_skin_'+hero_id).hasClass('toGray')){ //没有英雄，经典皮肤要隐藏
                                                    break;
                                                }
                                                flag = 1;
                                                skin_has_count++;
                                                break;
                                            }
                                        }
                                    }

                                    if(flag == 0){ //没有该英雄，如果有皮肤也应该
//                                        has_skin_class = "nohasskin";
                                    }
//                                    var skin_id = parseInt(k);
                                    var skin_name = v;
                                    var skin_url = getHeroSkinById(hero_id,skin_id);
                                    skin_list_html += '<li><img class="'+ has_skin_class +'" width="170" height="240" src="'+skin_url+'" alt=""><div class="per_hero_listImghover"><span>未拥有</span></div><p>'+ skin_name +'</p></li>';
                                });
                                $(".per_noskin").text(skin_count);
//                                $(".per_haskin").text(skin_has_count);
                                $("#skin_list").html(skin_list_html);

                            }
                        });
                    }

                });

            }
        });
    }

    //筛选英雄
    $(".hero_location").on('click', function(){
        //重置
        $(".hero_list li").show();
        $(".hero_skin_list li").show();

        var id = $(this).attr('data-id');

        $.each($(".hero_location"), function(k, v){
            if($(this).attr('data-id') == id){
                $(this).attr('checked', 'checked');
            }
        });

        if(id == 0){  //全部
            $(".hero_list li").show();
            $(".hero_skin_list li").show();
        }else if(id == -1){
            $('.hero_list>li:not(.toGray)').hide();
            $('.hero_skin_list>li:not(.toGray)').hide();
        }else{
            $(".hero_list li").hide();
            $(".hero_skin_list li").hide();
            $(".hero_location_"+id).show();
        }

    });

    //根据用户名搜素
    $(".skinSearchBtn").on('click', function(){
        var hero_name = $(this).parent().find(".skinSearchName").val();

        if(hero_name != "" && hero_name != undefined){
            $(".hero_list li").show();
            $(".hero_skin_list li").show();
        }else{
            alert('请选择需要搜索的英雄名');
            return false;
        }

        $(".hero_list li").hide();
        $(".hero_skin_list li").hide();

        $(".s_hero_name").each(function(k, v){
            if($(this).text().indexOf(hero_name) >= 0){
                $(this).parent().show();
            }
        });
    });

    function TGDialogS(e){
        need("biz.dialog-min",function(Dialog){
            Dialog.show({
                id:e,
                bgcolor:'#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff"
                opacity:50      //弹出“遮罩”的透明度，格式为｛10-100｝，可选
            });
        });
    }
    function closeDialog(){
        need("biz.dialog-min",function(Dialog){
            Dialog.hide();
        });
    }
}
catch(e)
{
    //empty
}