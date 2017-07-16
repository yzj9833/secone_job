/**
 * Created by Administrator on 2017/7/3.
 */
(function() {
    function tcss(e) {
        this.url = [],
            this.init(e)
    }
    var _d, _l, _b, _n = "-",
        _params, _curDomain, _curUrl, _domainToSet, _refUrl, _image, _ver = "ied3.0.2";
    window._refDomain;
    if (typeof _rep == "undefined") var _rep = 1;
    tcss.prototype = {
        init: function(e) {
            e ? _params = e: _params = {},
                _d = document;
            if (!_params.statIframe && window != top) try {
                _d = top.document
            } catch(t) {}
            _l = _d.location,
                _b = _d.body,
                _tt = []
        },
        run: function() {
            var e, t, n;
            e = (new Date).getTime(),
                _cookie.init(),
                this.url.push(this.getDomainInfo()),
                this.url.unshift("http://pingfore." + _domainToSet + "/pingd?"),
                this.url.push(this.getRefInfo(_params));
            try {
                navigator.cookieEnabled ? this.url.push("&pvid=" + _cookie.setCookie("pgv_pvid", !0)) : this.url.push("&pvid=NoCookie")
            } catch(r) {
                this.url.push("&pvid=NoCookie")
            }
            this.url.push(this.getMainEnvInfo()),
                this.url.push(this.getExtendEnvInfo()),
                this.url.push("&vs=" + _ver),
                _params.userDefineVariable ? this.url.push(_udv.setv(_params.userDefineVariable)) : this.url.push(_udv.setv()),
                _cookie.setCookie("ssid"),
                _cookie.save(),
            _params.originalReferer && this.url.push("&or=" + _params.originalReferer),
                t = (new Date).getTime(),
                _params.extParam ? n = _params.extParam + "|": n = "",
                this.url.push("&ext=" + escape(n + (t - e))),
                this.url.push("&reserved1=" + escape(_params.reserved1Param || "")),
                this.url.push("&rand=" + Math.round(Math.random() * 1e5));
            var i = this.getSud();
            i && _tt.push("su=" + escape(i.substring(0, 256))),
                this.url.push("&tt=" + escape(_tt.join(";"))),
                this.sendInfo(this.url.join("")),
                this.url[0] = "http://iedtcss.qq.com/heatmap?",
                this.watchHot(this.url.join("")),
            _params.hot && (document.attachEvent ? document.attachEvent("onclick",
                function(e) {
                    pgvWatchClick(e)
                }) : document.addEventListener("click",
                function(e) {
                    pgvWatchClick(e)
                },
                !1)),
            _params.repeatApplay && _params.repeatApplay == "true" && typeof _rep != "undefined" && (_rep = 1)
        },
        getSud: function() {
            if (_params.sessionUserType) return _params.sessionUserType;
            var e = _params.sudParamName || "sessionUserType",
                t = this.getParameter(e, _d.URL);
            return t
        },
        getDomainInfo: function(e) {
            var t, n;
            _curDomain = t = _params.virtualDomain || _l.host,
                t = _curDomain.toLowerCase(),
            _domainToSet || (_domainToSet = this.getCookieSetDomain());
            if (e) {
                var r = t.indexOf(":");
                r > -1 ? t = t.substr(0, r) + ".hot" + t.substr(r) : t += ".hot"
            }
            return n = this.getCurrentUrl(),
            "dm=" + t + "&url=" + n
        },
        getCurrentUrl: function() {
            var e = "",
                t = _n;
            if (_params.virtualURL) e = _params.virtualURL;
            else {
                e = _curUrl = escape(_l.pathname),
                _l.search != "" && (t = escape(_l.search.substr(1)));
                if (_params.senseParam) {
                    var n = this.getParameter(_params.senseParam, _d.URL);
                    n && (e += "_" + n)
                }
            }
            return e + "&arg=" + t
        },
        getRefInfo: function(e) {
            var t = _n,
                n = _n,
                r = _n,
                i = _d.referrer,
                s, o, u, a = e.virtualDomain ? e.virtualDomain: _n,
                f = e.virtualURL ? e.virtualURL: _n;
            _refDomain = e.virtualRefDomain ? e.virtualRefDomain: "",
                _refUrl = e.virtualRefURL ? e.virtualRefURL: "";
            if (e.statIframe || e.useCookie == "true") {
                i = _cookie.get("pgvReferrer=");
                var l = _d.URL,
                    c = l.indexOf("?");
                c > -1 && (l = l.substr(0, c)),
                    _cookie.set("pgvReferrer", l)
            } else if (e.useCookie == "set" && _refDomain != "" && _refUrl != "") {
                var l = "https:" == _l.protocol ? "https://": "http://";
                l += _refDomain + refUrl,
                    _cookie.set("pgvReferrer", l)
            } else if (e.useCookie != "set" || a == _n && f == _n) if (e.useCookie == "get") {
                var h = _cookie.get("pgvReferrer=");
                h != "" && (i = h),
                    _cookie.set("pgvReferrer", "")
            } else _cookie.set("pgvReferrer", "");
            else {
                var l = "https:" == _l.protocol ? "https://": "http://";
                l += a == _n ? _curDomain: a,
                    l += f == _n ? _curUrl: f,
                    _cookie.set("pgvReferrer", l)
            }
            s = e.tagParamName || "ADTAG",
                o = this.getParameter(s, _d.URL),
            o && (t = "ADTAG", n = o),
                u = i.indexOf("://");
            if (u > -1 && t == _n) {
                var p = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i,
                    d = i.match(p);
                d && (t = d[2], n = d[4] + d[5])
            }
            if (i.indexOf("?") != -1) {
                var u = i.indexOf("?") + 1;
                r = i.substr(u)
            }
            _refDomain != "" && e.useCookie == "false" && (t = _refDomain),
            _refUrl != "" && e.useCookie == "false" && (n = _refUrl),
                _refDomain = t,
                _refUrl = escape(n);
            var v = _n,
                m = _n;
            v = _cookie.get("ied_rf=", !0),
                m = _cookie.get("ied_qq=", !0);
            if (v == _n || t == "ADTAG" || "--" == v || v.indexOf("ADTAG") == -1 && t != _n) {
                var g = t + n;
                g.length > 128 && (g = g.substring(0, 128)),
                    v = g;
                var y = new Date;
                y.setDate(y.getDate() + 1),
                    y.setHours(y.getHours() - y.getHours()),
                    y.setMinutes(y.getMinutes() - y.getMinutes()),
                    y.setSeconds(y.getSeconds() - y.getSeconds());
                var b = "ied_rf=" + v + ";path=/;domain=" + this.getCookieSetDomain(!0) + ";expires=" + y.toGMTString();
                _d.cookie = b
            }
            return "&rdm=" + _refDomain + "&rurl=" + _refUrl + "&rarg=" + escape(r) + "&ied_rf=" + v + "&ied_qq=" + m
        },
        getMainEnvInfo: function() {
            var e = "";
            try {
                var t = _n,
                    n = _n,
                    r = _n,
                    i = _n,
                    s = _n,
                    o = _n,
                    u = 0,
                    a = navigator;
                self.screen && (t = screen.width + "x" + screen.height, n = screen.colorDepth + "-bit"),
                    a.language ? r = a.language.toLowerCase() : a.browserLanguage && (r = a.browserLanguage.toLowerCase()),
                    u = a.javaEnabled() ? 1 : 0,
                    i = a.cpuClass,
                    s = a.platform,
                    o = (new Date).getTimezoneOffset() / 60,
                    e = "&scr=" + t + "&scl=" + n + "&lang=" + r + "&java=" + u + "&cc=" + i + "&pf=" + s + "&tz=" + o
            } catch(f) {} finally {
                return e
            }
        },
        getExtendEnvInfo: function() {
            var e = "";
            try {
                var t, n = _l.href,
                    r = _n;
                e += "&flash=" + this.getFlashInfo(),
                _b.addBehavior && (_b.addBehavior("#default#homePage"), _b.isHomePage(n) && (e += "&hp=Y")),
                _b.addBehavior && (_b.addBehavior("#default#clientCaps"), r = _b.connectionType),
                    e += "&ct=" + r
            } catch(i) {} finally {
                return e
            }
        },
        getFlashInfo: function() {
            var f = _n,
                n = navigator;
            try {
                if (n.plugins && n.plugins.length) {
                    for (var i = 0; i < n.plugins.length; i++) if (n.plugins[i].name.indexOf("Shockwave Flash") > -1) {
                        f = n.plugins[i].description.split("Shockwave Flash ")[1];
                        break
                    }
                } else if (window.ActiveXObject) for (var i = 12; i >= 5; i--) try {
                    var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + i + "');");
                    if (fl) {
                        f = i + ".0";
                        break
                    }
                } catch(e) {}
            } catch(e) {}
            return f
        },
        getParameter: function(e, t) {
            if (e && t) {
                var n = new RegExp("(\\?|#|&)" + e + "=([^&^#]*)(#|&|$)"),
                    r = t.match(n);
                return r ? r[2] : ""
            }
            return ""
        },
        getCookieSetDomain: function(e) {
            var t, n, r, i = [],
                s = 0;
            for (var o = 0; o < _curDomain.length; o++) _curDomain.charAt(o) == "." && (i[s] = o, s++);
            t = i.length,
                n = _curDomain.indexOf(".cn"),
            n > -1 && t--,
                r = "qq.com",
                t == 1 ? r = _curDomain: t > 1 && (r = _curDomain.substring(i[t - 2] + 1));
            if (e) switch (t) {
                case 1:
                case 2:
                    r = _curDomain;
                    break;
                default:
                    r = _curDomain.substring(i[t - 3] + 1)
            }
            return r
        },
        watchClick: function(e) {
            try {
                var t = !0,
                    n = "",
                    r;
                r = window.event ? window.event.srcElement: e.target;
                switch (r.tagName) {
                    case "A":
                        n = "<A href=" + r.href + ">" + r.innerHTML + "</a>";
                        break;
                    case "IMG":
                        n = "<IMG src=" + r.src + ">";
                        break;
                    case "INPUT":
                        n = "<INPUT type=" + r.type + " value=" + r.value + ">";
                        break;
                    case "BUTTON":
                        n = "<BUTTON>" + r.innerText + "</BUTTON>";
                        break;
                    case "SELECT":
                        n = "SELECT";
                        break;
                    default:
                        t = !1
                }
                if (t) {
                    var i = new tcss(_params),
                        s = i.getElementPos(r);
                    if (_params.coordinateId) {
                        var o = i.getElementPos(document.getElementById(_params.coordinateId));
                        s.x -= o.x
                    }
                    i.url.push(i.getDomainInfo(!0)),
                        i.url.push("&hottag=" + escape(n)),
                        i.url.push("&hotx=" + s.x),
                        i.url.push("&hoty=" + s.y),
                        i.url.push("&rand=" + Math.round(Math.random() * 1e5)),
                        i.url.unshift("http://pinghot." + _domainToSet + "/pingd?"),
                        i.sendInfo(i.url.join(""))
                }
            } catch(u) {}
        },
        getElementPos: function(e) {
            if (e.parentNode === null || e.style.display == "none") return ! 1;
            var t = navigator.userAgent.toLowerCase(),
                n = null,
                r = [],
                i;
            if (e.getBoundingClientRect) {
                var s, o, u, a;
                return i = e.getBoundingClientRect(),
                    s = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                    o = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                    u = document.body.clientTop,
                    a = document.body.clientLeft,
                {
                    x: i.left + o - a,
                    y: i.top + s - u
                }
            }
            if (document.getBoxObjectFor) {
                i = document.getBoxObjectFor(e);
                var f = e.style.borderLeftWidth ? Math.floor(e.style.borderLeftWidth) : 0,
                    l = e.style.borderTopWidth ? Math.floor(e.style.borderTopWidth) : 0;
                r = [i.x - f, i.y - l]
            } else {
                r = [e.offsetLeft, e.offsetTop],
                    n = e.offsetParent;
                if (n != e) while (n) r[0] += n.offsetLeft,
                    r[1] += n.offsetTop,
                    n = n.offsetParent;
                if (t.indexOf("opera") > -1 || t.indexOf("safari") > -1 && e.style.position == "absolute") r[0] -= document.body.offsetLeft,
                    r[1] -= document.body.offsetTop
            }
            e.parentNode ? n = e.parentNode: n = null;
            while (n && n.tagName != "BODY" && n.tagName != "HTML") r[0] -= n.scrollLeft,
                r[1] -= n.scrollTop,
                n.parentNode ? n = n.parentNode: n = null;
            return {
                x: r[0],
                y: r[1]
            }
        },
        getPos: function(e, t, n, r) {
            n = n || 0,
                r = r || 0,
                t = t || document;
            var i = e || window.event,
                s = {};
            i.pageX || i.pageY ? s = {
                x: i.pageX,
                y: i.pageY
            }: s = {
                x: i.clientX + Math.max(t.documentElement.scrollLeft, t.body.scrollLeft) - t.body.clientLeft,
                y: i.clientY + Math.max(t.documentElement.scrollTop, t.body.scrollTop) - t.body.clientTop
            },
                s.x += n,
                s.y += r;
            var o = Math.max(Math.max(document.body.clientWidth, document.body.offsetWidth), Math.max(document.body.scrollWidth, document.documentElement.scrollWidth)) / 2,
                u = window.screen.width / 2;
            return s.x = s.x - o + u - (Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) > (typeof window.innerHeight == "undefined" ? document.documentElement.clientHeight: window.innerHeight) ? 8.5 : 0),
                s
        },
        sendHeat: function(e, t) {
            e += "&x=" + t.x + "&y=" + t.y + "&r3=" + Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                (new Image).src = e
        },
        clickHeat: function(e, t) {
            this.sendHeat(e, this.getPos(t))
        },
        heapClick: function(e, t) {
            var n = function(e, t, n) {
                    var r = function(e) {
                        e = window.event || e,
                            target = e.srcElement || e.target,
                            n(e, target)
                    };
                    e.attachEvent ? e.attachEvent("on" + t, r) : e.addEventListener(t, r, !1)
                },
                r = this;
            if (t) r.clickHeat(e, evt);
            else {
                var i = document;
                n(i, "click",
                    function(t) {
                        r.sendHeat(e, r.getPos(t))
                    });
                var s = i.getElementsByTagName("iframe");
                for (var o = 0,
                         u = s.length; o < u; o++) try { (function() {
                    var t = s[o],
                        i = t.contentWindow.document;
                    n(i, "click",
                        function(n, s) {
                            var o = r.getElementPos(t),
                                u = o.x,
                                a = o.y;
                            r.sendHeat(e, r.getPos(n, i, u, a))
                        })
                })()
                } catch(t) {
                    continue
                }
            }
        },
        watchHot: function(e) {
            var t = window.location,
                n = t.host + t.pathname,
                r = t.pathname,
                i = this;
            this.loadScript("http://ossweb-img.qq.com/images/js/mms/" + t.hostname + ".js?random=" + +(new Date),
                function() {
                    var t;
                    if (window._Cnf && window._Cnf.isValid && (t = window._Cnf.url)) {
                        var n = t.split("|");
                        for (var s = 0; s < n.length; s++) if (n[s] == r) {
                            i.heapClick(e);
                            break
                        }
                    }
                })
        },
        loadScript: function(e, t) {
            var bIsIE = ((navigator.userAgent.indexOf('MSIE') == -1) ? false: true);
            var n = document.createElement("script"),
                r = document.getElementsByTagName('BODY').item(0);
            n.type = "text/javascript";
            n.onerror = function() {
                if ('function' == typeof(t)) t();
                n = null
            };
            if (bIsIE) {
                n.onreadystatechange = function() {
                    if (this.readyState.toLowerCase() != "complete" && this.readyState.toLowerCase() != "loaded") return;
                    if (this.$funExeced != true && 'function' == typeof(t)) {
                        this.$funExeced = true;
                        r.removeChild(n);
                        t()
                    }
                    n = null
                }
            } else {
                n.onload = function() {
                    if ('function' == typeof(t)) {
                        t();
                        r.removeChild(n)
                    }
                    n = null
                }
            }
            n.src = e;
            r.appendChild(n)
        },
        sendClick: function() {
            _params.hottag && (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + escape(_params.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(Math.random() * 1e5)), this.url.unshift("http://pinghot." + _domainToSet + "/pingd?"), this.sendInfo(this.url.join("")))
        },
        hrefClick: function(href,extraOptions) {
            _params.hottag && (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + escape(_params.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(Math.random() * 1e5)), this.url.unshift("http://pinghot." + _domainToSet + "/pingd?"));

            return this.sendInfoHref(this.url.join(""),href,extraOptions);
        },

        sendInfo: function(e) {
            _image = new Image(1, 1),
                _image.src = e
        },
        sendInfoHref: function(e,url,extraOptions) {
            var isdebug=(typeof extraOptions!='undefined'&&typeof extraOptions.debug!='undefined'&&extraOptions.debug);
            if(typeof extraOptions!='undefined'&&typeof extraOptions.onBeforeReport=='function'){
                if(!extraOptions.onBeforeReport()){
                    return true;

                }
            }
            if(isdebug){
                alert('Ready to report.');
            }
            _image = new Image(1, 1),
                _image.src = e;
            _image.onload=_image.onerror=function(){
                if(isdebug){
                    alert('Reported,url: '+e);
                }
                if(typeof extraOptions!='undefined'&&typeof extraOptions.onBeforeJump=='function'){
                    if(extraOptions.onBeforeJump()){
                        if(isdebug){
                            alert('Ready to jump.');
                        }
                        location.href=url;
                    }
                }else{
                    if(isdebug){
                        alert('Ready to jump.');
                    }
                    location.href=url;
                }

            }
            return false;
        }
    };
    var _udv = {
            vscope: {
                page: 3,
                session: 2,
                user: 1
            },
            setv: function(e) {
                var t = "",
                    n = "";
                if (!e || !e.name || e.name == "" || !e.value || e.value == "" || !e.scope || e.scope < 1 || e.scope > 3) n = _cookie.get("custvar=") == _n ? _cookie.get("custvar=", !0) : _cookie.get("custvar="),
                    t = "&custvar=" + n;
                else {
                    var n = e.name + ":" + e.value;
                    switch (e.scope) {
                        case this.vscope.page:
                            break;
                        case this.vscope.session:
                            _cookie.setCookie("custvar", !1, n);
                            break;
                        case this.vscope.user:
                            _cookie.setCookie("custvar", !0, n)
                    }
                    t = "&custvar=" + n
                }
                return t
            }
        },
        _cookie = {
            sck: [],
            sco: {},
            init: function() {
                var e = this.get("pgv_info=", !0);
                if (e != _n) {
                    var t = e.split("&");
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n].split("=");
                        this.set(r[0], unescape(r[1]))
                    }
                }
            },
            get: function(e, t) {
                var n = t ? _d.cookie: this.get("pgv_info=", !0),
                    r = _n,
                    i,
                    s;
                i = n.indexOf(e);
                if (i > -1) {
                    i += e.length,
                        s = n.indexOf(";", i),
                    s == -1 && (s = n.length);
                    if (!t) {
                        var o = n.indexOf("&", i);
                        o > -1 && (s = Math.min(s, o))
                    }
                    r = n.substring(i, s)
                }
                return r
            },
            set: function(e, t) {
                this.sco[e] = t;
                var n = !1,
                    r = this.sck.length;
                for (var i = 0; i < r; i++) if (e == this.sck[i]) {
                    n = !0;
                    break
                }
                n || this.sck.push(e)
            },
            setCookie: function(e, t, n) {
                var r = _cookie.get(e + "=", t);
                if (r == _n && !n) {
                    t ? r = "": r = "s";
                    var i = new Date,
                        s = i.getUTCMilliseconds();
                    r += Math.round(Math.abs(Math.random() - 1) * 2147483647) * s % 1e10
                } else r = n ? n: r;
                return t ? this.saveCookie(e + "=" + r, "expires=Sun, 18 Jan 2038 00:00:00 GMT;") : this.set(e, r),
                    r
            },
            save: function() {
                if (_params.sessionSpan) {
                    var e = new Date;
                    e.setTime(e.getTime() + _params.sessionSpan * 60 * 1e3)
                }
                var t = "",
                    n = this.sck.length;
                for (var r = 0; r < n; r++) t += this.sck[r] + "=" + this.sco[this.sck[r]] + "&";
                t = "pgv_info=" + t.substr(0, t.length - 1);
                var i = "";
                e && (i = "expires=" + e.toGMTString()),
                    this.saveCookie(t, i)
            },
            saveCookie: function(e, t) {
                _d.cookie = e + ";path=/;domain=" + _domainToSet + ";" + t
            }
        };
    window.pgvMain = function(e, t) {
        var n = "";
        t ? (n = t, _ver = "o3.0.2") : (n = e, _ver = "3.0.2");
        try {
            if (_rep != 1) return;
            _rep = 2,
                (new tcss(n)).run()
        } catch(r) {}
    },
        window.pgvSendClick = function(e) { (new tcss(e)).sendClick()
        },
        window.pgvWatchClick = function(e) { (new tcss(e)).watchClick(e)
        },
        window.pgvHref = function(e,url,extraOptions) {
            if(typeof url=="undefined"||url==null){
                (new tcss(e)).sendClick();
                return false;
            }
            if(typeof url!="string")
                url=url.getAttribute('href');
            if(typeof extraOptions!='undefined')
                return (new tcss(e)).hrefClick(url,extraOptions);
            else
                return (new tcss(e)).hrefClick(url);
        }
    //add by yamiedie 2015-09-30
    var dcv={
        channel:'',//渠道名称
        dcvDomain:document.referrer,
        device:(function(){
            var o=navigator.userAgent;
            if(o.indexOf("iPhone")>-1||o.indexOf("iPad")>-1||o.indexOf("iPod")>-1||o.indexOf("Android")>-1)return "m";
            else return "pc";
        })(),
        //事件注册
        addEvent:function(el,type,handler,capture){
            if(typeof el.addEventListener!= 'undefined'){
                el.addEventListener(type, handler, capture);
            }
            else if (typeof el.attachEvent!='undefined')el.attachEvent('on'+type,handler);
            else el['on'+type] = handler;
        },
        //获取url里的参数
        getParameterByName:function(name){
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search.toLowerCase());
            if(results == null)return "";
            else return decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        //操作session||cookie三部曲
        getData:function(a){if(window.sessionStorage)return sessionStorage.getItem(a);
        else{a+="=";for(var e=document.cookie.split(";"),b=0,c=e.length;b<c;b++){for(var d=e[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return unescape(d.substring(a.length,d.length))}return!1}
        },
        setData:function(a,e,b){if(window.sessionStorage)sessionStorage.setItem(a,e);
        else{b=b||0;var c="";0!=b&&(c=new Date,c.setTime(c.getTime()+1E3*b),c="; expires="+c.toGMTString());document.cookie=a+"="+escape(e)+c+"; path=/"}
        },
        //获取和设定session
        getChannel:function(){
            var adtag=dcv.getParameterByName("adtag").split("."),a=dcv.dcvDomain;
            var session=dcv.getData("channel");			//从sessionStorage里获取渠道名称
            function _setSession(s){
                dcv.channel=s;
                session=dcv.setData("channel",s);
            }
            if (-1 < a.indexOf("baidu.com") ){          //优先seo的来源
                _setSession("seo_baidu");
            }else if(-1 < a.indexOf("sogou.com")){
                _setSession("seo_sogou");
            }else if(-1 < a.indexOf("sm.cn")){
                _setSession("seo_sm");
            }else if(-1 < a.indexOf("so.com")){
                _setSession("seo_360");
            }else if(-1 < a.indexOf("bing.com")){
                _setSession("seo_bing");
            }else if(-1 < a.indexOf("google.com")){
                _setSession("seo_google");
            }
            else if(adtag.length>1){                                    //还需要加入一个判断,如果有adtag但是并不是dcv
                if(adtag[0]=="dcv"){
                    _setSession(adtag[2]);
                }
                else if(adtag[0]=="media"||adtag[0]=="cop"){
                    _setSession("media");
                }else{
                    _setSession("other");
                }
            }
            else if(session){	//如果之前设置过session；内页的情况
                dcv.channel=session;
            }
            else{	//如果从链接的参数里,从session里都获取不到渠道名称
                _setSession("other");
            }
            return dcv.channel;
        },
        //最终上报
        dcvReport:function(){
            dcv.getChannel();
            pgvSendClick({hottag:"dcv."+dcv.device+".pv."+dcv.channel});//每页都会上报的,PV看dcv.device.pv的PV，UV看dcv.device.pv的PV
            var aArr=document.getElementsByTagName("a");
            for(var i=0,l=aArr.length;i<l;i++){
                if(aArr[i].getAttribute("href")&&aArr[i].getAttribute("href").indexOf("/d/")>-1){
                    dcv.addEvent(aArr[i],"click",function(){pgvSendClick({hottag:"dcv."+dcv.device+".download."+dcv.channel});},false);	//下载按钮注册上报事件
                }
            }
        },
        action:function(){
            window.setTimeout(function(){
                if(typeof(dcv.dcvDomain)=="undefined")dcv.action();
                else dcv.dcvReport();
            },50);
        }
    }
    dcv.action();
})()/*  |xGv00|425dc704572176731052e6bc061f83a4 */