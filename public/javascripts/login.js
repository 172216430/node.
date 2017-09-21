/**
 * Created by Administrator on 2017/9/14.
 */
$(function () {
    var input1kg = false
    var input2kg = false
    var input3kg = false
    // 注册页面请求
    //用户名
    $('.login-input1').blur(function () {
        var result = /[a-zA-Z][a-zA-Z0-9_]{4,11}/
        if (!result.test($('.login-input1').val())) {
            layer.tips('用户名不合法,5-12位,前两位必须是字母', '.login-input1', {
                tips: [2]
            });
            $('.login-span1').html('')
            return input1kg = falsered
        } else {
            $('.login-span1').html('√')
            $.get('/login1', $(".login-form").serialize()).then(function (data) {
                if (data.data.length == 0) {
                    $('.login-span1').html('√')
                    return input1kg = true
                } else {
                    layer.tips('用户名不合法,5-12位,前两位必须是字母', '.login-input1', {
                        tips: [2]
                    });
                    $('.login-span1').html('')
                    return input1kg = false
                }
            })
        }
    })
    //密码
    $('.login-input2').blur(function () {
        var result2 = /^[a-zA-Z]\w{5,17}$/
        if (!result2.test($('.login-input2').val())) {
            layer.tips('以字母开头，长度在6~18之间,只能包含字母、数字和下划线', '.login-input2', {
                tips: [2]
            });
        } else {
            $('.login-span2').html('√')
            //密码确认
            $('.login-input3').blur(function () {
                if ($('.login-input2').val() != $('.login-input3').val()) {
                    layer.tips('两次密码输入不一致', '.login-input3', {
                        tips: [2]
                    });
                    $('.login-span2').html('')
                    return input2kg = false
                } else {
                    $('.login-span3').html('√')
                    return input2kg = true
                }
            })
        }
    })
    //邮箱
    $('.login-input4').blur(function () {
        var result3 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!result3.test($('.login-input4').val())) {
            layer.tips('邮箱格式不正确', '.login-input4', {
                tips: [2]
            })
            $('.login-span1').html('')
            return input3kg = false
        } else {
            $('.login-span4').html('√')
            return input3kg = true
        }
    })

    //点击按钮提交
    $('.login-button').on('click', function () {
        if (input1kg == true) {
            if (input2kg == true) {
                if (input3kg == true) {
                    $('.login-p').html('√')
                    var paramStr = $(".login-form").serialize();
                    $.post('/login',paramStr)
                    $(window).attr('location','http://localhost:3000/register');
                } else {
                    layer.tips('请认真核对邮箱', '.login-button', {
                        tips: [2]
                    })
                }

            } else {
                layer.tips('请认真核对密码', '.login-button', {
                    tips: [2]
                })
            }
        } else {
            layer.tips('请认真核对用户名', '.login-button', {
                tips: [2]
            })
        }
    })
})