var pt_utility=pt_logout={ret:0,appDomain:"",mainDomain:"",httpWhiteDomain:{"qq.com":1,"soso.com":1,"paipai.com":1,"tenpay.com":1,"taotao.com":1,"tencent.com":1,"oa.com":1,"webdev.com":1,"3366.com":1,"imqq.com":1,"pengyou.com":1,"qplus.com":1,"qzone.com":1,"server.com":1,"myapp.com":1,"kuyoo.cn":1,"weiyun.com":1,"wechatapp.com":1,"51buy.com":1,"qcloud.com":1,"wechat.com":1},httpsWhiteDomain:{"qq.com":1,"tenpay.com":1,"3366.com":1,"soso.com":1,"paipai.com":1,"pengyou.com":1,"imqq.com":1,"qzone.com":1,"qcloud.com":1,"51buy.com":1,"weiyun.com":1,"myapp.com":1},getCookie:function(o){var t;return function(o){if(!o)return o;for(;o!=unescape(o);)o=unescape(o);for(var t=["<",">","'",'"',"%3c","%3e","%27","%22","%253c","%253e","%2527","%2522"],n=["&#x3c;","&#x3e;","&#x27;","&#x22;","%26%23x3c%3B","%26%23x3e%3B","%26%23x27%3B","%26%23x22%3B","%2526%2523x3c%253B","%2526%2523x3e%253B","%2526%2523x27%253B","%2526%2523x22%253B"],e=0;e<t.length;e++)o=o.replace(new RegExp(t[e],"gi"),n[e]);return o}((t=document.cookie.match(RegExp("(^|;\\s*)"+o+"=([^;]*)(;|$)")))?unescape(t[2]):"")},delCooike:function(o,t,n){document.cookie=o+"=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path="+(n||"/")+"; "+(t?"domain="+t+";":"")},jsonp:function(o){var t=document.createElement("script");t.setAttribute("src",o),document.getElementsByTagName("head")[0].appendChild(t)},nlog:function(o,t,n){if("http:"==location.protocol&&Math.random()<(n||1)){var e=location.href,p=encodeURIComponent(o+"|_|"+e+"|_|"+window.navigator.userAgent),a="//ui.ptlogin2.qq.com/cgi-bin/report?id="+t+"&msg="+p+"&v="+Math.random();(new Image).src=a}},init:function(){var o=location.hostname.match(/\w+(\.\w+){2}$/);pt_logout.appDomain=o?o[0]:"",/^\w\w\w\./.test(pt_logout.appDomain)&&(pt_logout.appDomain=pt_logout.appDomain.substr(4));var t=location.host.match(/\w*\.(com|cn)$/);pt_logout.mainDomain=t?t[0]:""},getLogoutUrl:function(){var o=pt_logout.getCookie("pt4_token"),t=pt_logout.getCookie("skey"),n=pt_logout.time33(t);if(!o&&!t)return"";var e="";return e="https:"==location.protocol?"https://ssl.ptlogin2."+(pt_logout.httpsWhiteDomain[pt_logout.mainDomain]?pt_logout.mainDomain:"qq.com")+"/logout?":"http://ptlogin2."+(pt_logout.httpWhiteDomain[pt_logout.mainDomain]?pt_logout.mainDomain:"qq.com")+"/logout?",e+="pt4_token="+o+"&pt4_hkey="+n+"&deep_logout=1"},time33:function(o){for(var t=0,n=0,e=o.length;n<e;n++)t=33*t+o.charCodeAt(n);return t%4294967296},set_ret:function(o,t){try{var n=pt_logout.getCookie("pt4_token");o>0?(pt_logout.delCooike("p_uin",t),pt_logout.delCooike("p_skey",t),pt_logout.delCooike("pt4_token",t),""!=pt_logout.appDomain&&""!=pt_logout.getCookie("skey_m")&&(pt_logout.delCooike("uin_m",pt_logout.appDomain),pt_logout.delCooike("skey_m",pt_logout.appDomain))):pt_logout.nlog("logout fail","285851",.1),"function"==typeof pt_logout.callback&&pt_logout.callback(o),t!=pt_logout.appDomain&&pt_logout.nlog("domain unsame:n="+o+":pt4_token="+n+":cgi_domain="+t+":js_domain="+pt_logout.appDomain,"285852",.1)}catch(o){return}},logout:function(o,t){pt_logout.init(),"function"==typeof t&&(pt_logout.callback=t);var n=pt_logout.getLogoutUrl();return n?pt_logout.mainDomain?(pt_logout.jsonp(n),0):2:1}};