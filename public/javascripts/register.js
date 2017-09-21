/**
 * Created by Administrator on 2017/9/19.
 */
$(function () {
    $('button').on('click',()=>{
        if($('.input1').val() != ''){
            if($('.input2').val() != ''){
                let s = $('.form').serialize()
                $.post('/register',s).then((data)=>{
                    layer.alert(data.msg,()=>{
                        if(data.c == false){
                            location.reload()
                        }else {
                            $(window).attr('location','http://localhost:3000/');
                        }
                    })
                })
            }else {
                layer.alert('请输入密码')
            }
        }else {
            layer.alert('请输入账号')
        }
    })
})