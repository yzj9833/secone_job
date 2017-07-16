
    //0攻击 1法术 2防御 3移动 4打野 5辅助
    $.ajax({
        type:"GET",
        url:"/item",
        success:function(data){
            var list=data;
            var html="";
            var lis="";
            //遍历数据
            for(var key in data){
                html+=`<li>
            <a href="#none" data-id="${key}">
                <img src="img/item-img/${data[key].img}" width="91px" alt="${data[key].img}">
                 ${data[key].name}
                </a>
                </li>`;
            }
            //加载数据，增加遮罩层
            $("#Jlist-details").html(html).on("mousemove","li",function(e){
                var id=$(this).children().data("id");
                $("#Jpic").attr("src","img/item-img/"+data[id].img);
                $("#Jname").html(data[id].name);
                $("#Jprice").html("售价:"+data[id].price);
                $("#Jtprice").html("总价:"+data[id].tprice);
                $("#Jitem-desc1").html(data[id].jdesc1);
                $("#Jitem-desc2").html(data[id].jdesc2);
                var x = e.pageX;
                var y = e.pageY;
                $("#popPupItem").css({
                    left: x+50,
                    top: y,
                    display:'block'
                })
            }).on("mouseout","li",function(e){
                $("#popPupItem").css({display: 'none'})});
            var kind=['全部','攻击','法术','防御','移动','打野','辅助'];
            for(var i=0;i<kind.length;i++){
                lis+=`<li data-type="${i}">
                        <span class="ms-radio"><i class="i"></i></span>
                        <label>${kind[i]}</label>
                    </li>`;
            }
            $(".types-ms").html(lis).children().first().addClass("current");
            $(".types-ms").children().on("click",function(e){
                $(this).addClass("current").siblings().removeClass("current");
                var i=$(this).index()-1;
                var html="";
                for(var key in data){
                    if(i===data[key].nid)
                    html+=`<li>
            <a href="#none" data-id="${key}">
                <img src="img/item-img/${data[key].img}" width="91px" alt="${data[key].img}">
                 ${data[key].name}
                </a>
                </li>`;
                    else if(i===-1)
                        html+=`<li>
            <a href="#none" data-id="${key}">
                <img src="img/item-img/${data[key].img}" width="91px" alt="${data[key].img}">
                 ${data[key].name}
                </a>
                </li>`;
                }
                $("#Jlist-details").html(html);
            });
            $("#search").bind("input",function(){
                var search=$("#search").val();
                $.ajax({
                    type:"post",
                    url:"/search",
                    data:{search:search},
                    success:function(data){
                        $(".types-ms").html(lis).children().first().addClass("current");
                        if(data.length>0){
                            var html="";
                           for(var i=0;i<data.length;i++){
                               var id=data[i]['did']-1;
                               html+=`<li>
                                <a href="#none" data-id="${key}">
                                    <img src="img/item-img/${list[id].img}" width="91px" alt="${list[id].img}">
                                     ${list[id].name}
                                    </a>
                                    </li>`;
                            }
                            $("#Jlist-details").html(html);
                        }
                        else if(data.length==0)
                            $("#Jlist-details").html("");
                    }
                })
            })
        }

    });









