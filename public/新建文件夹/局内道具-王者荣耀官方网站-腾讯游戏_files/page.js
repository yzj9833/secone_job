function g(tag) {return document.getElementById(tag)}
 $('.header-inner').hover(function(){
   $('#J_subNav').css('visibility','visible');
 },function(){
   $('#J_subNav').css('visibility','hidden');
 });  
     
//弹层
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



milo.addEvent(window,'load',function(){
  //周免英雄
  loadScript("/web201605/js/freeHero.js");
  //合作媒体
  loadScript("/web201605/js/media.js");
  //头部
  loadScript("http://ossweb-img.qq.com/images/js/title.js");   
});