/**
 * Created by Administrator on 2017/9/20.
 */
$(function () {
    var page1 = 1
    $('.button').on('click',()=>{
        let a = $(".form").serialize();
        if($('textarea').val() != ''){
            $.post('/publish',a).then((data)=>{
                layer.alert(data.msg)
                document.getElementById("form").reset()
                fun()
            })
        }
    })
    
    function fun() {
         $.get('/index1').done((data)=>{
             var s =  Math.ceil(data.count/4)
             var pagerStr = new EJS({url: "/ejs/ejs.ejs"}).render({
                 data:data.data,
                 count:s,
                 page :page1
             });
             $(".ejs").html(pagerStr);

         })
    }
    fun()
    $(document).delegate(".page-button", "click", function () {
        page1 = parseInt($(this).html())
        $.get('/index1',{page:$(this).html()})
            fun()
    })
    $(document).delegate(".Delete", "click", function () {
        var index = layer.confirm("确定要删除此项吗？一旦删除不可恢复", {
            btn: ["取消", "删除"],
            skin: "confirm-btn"
        },  () =>{
            layer.close(index);
        },()=>{
            var id =$(this).attr('id')
            $.get('/delete',{_id:id})
            fun()
        })
    })
})