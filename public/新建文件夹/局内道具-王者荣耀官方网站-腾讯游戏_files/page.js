function g(tag) {return document.getElementById(tag)}
 $('.header-inner').hover(function(){
   $('#J_subNav').css('visibility','visible');
 },function(){
   $('#J_subNav').css('visibility','hidden');
 });  
     
//����
function TGDialogS(e){
    need("biz.dialog-min",function(Dialog){
        Dialog.show({
            id:e,
            bgcolor:'#000', //���������֡�����ɫ����ʽΪ"#FF6600"�����޸ģ�Ĭ��Ϊ"#fff"
            opacity:50      //���������֡���͸���ȣ���ʽΪ��10-100������ѡ
        });
    });
}
function closeDialog(){
    need("biz.dialog-min",function(Dialog){
        Dialog.hide();
    });
}



milo.addEvent(window,'load',function(){
  //����Ӣ��
  loadScript("/web201605/js/freeHero.js");
  //����ý��
  loadScript("/web201605/js/media.js");
  //ͷ��
  loadScript("http://ossweb-img.qq.com/images/js/title.js");   
});