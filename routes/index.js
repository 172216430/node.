var express = require('express');
var router = express.Router();
var db = require('../models/db')
var login = require('../models/login')
var crypto = require('crypto');
var publish = require('../models/publish')

/* GET home page. */
//首页
var a = ''
var kg = false
function a1(req, res, next) {
    if (req.session.name != undefined) {
        a = '欢迎' + req.session.name.name
        kg = true
    } else {
        a = '请先登录'
        kg = false
    }
    next()
}
function a2(req, res, next) {
    if (kg == true) {
        res.send('请退出后再操作')
    }
    next()
}
router.get('/', a1, function (req, res, next) {
    res.render('index', {
        title: '首页',
        a: a,
        kg: kg,
    })
});
//注册
router.get('/login', a1, a2, function (req, res, next) {
    res.render('login', {
        title: '注册',
        kg: kg,
    })

})
//用户名确认
router.get('/login1', function (req, res, next) {
    var name = {}
    name.name = req.query.name
    login.find(name).then(function (data) {
        res.json({data: data})
    })
})
//注册行为
router.post('/login', function (req, res) {
    var md5 = crypto.createHash('md5');
    var passe = md5.update(req.body.passe).digest('hex');
    var s = new login({
        name: req.body.name,
        passe: passe,
        email: req.body.email
    })
    s.save()
})
//登录页面
router.get('/register', a1, a2, (req, res, next) => {
    res.render('register', {
        title: '登陆',
        kg: kg,
    })
})
//登录行为
router.post('/register', (req, res, next) => {
    req.session.name = null
    var md5 = crypto.createHash('md5');
    var passe = md5.update(req.body.passe).digest('hex');
    var name = req.body.name
    login.findOne({name: name}).then(function (data) {
        if (data == null) {
            res.json({msg: '用户名不存在',c:false})
        }
        if (data.passe != passe) {
            res.json({msg: '密码错误',c:false})
        }
        req.session.name = data
        res.json({msg: '登陆成功',c:true})
    })
})
router.get('/logout', (req, res, next) => {
    req.session.name = null
    res.redirect('/')
})
//发表行为
router.post('/publish', (req, res, next) => {
    var s = new publish({
        publish: req.body.textarea,
        name: req.session.name.name
    })
    s.save().then(function () {
        res.json({
            msg: '发布成功'
        })
    })
})
var s = 0
//显示信息
router.get('/index1', function (req, res) {
   if(req.query.page){
       s = (req.query.page - 1 )*4
   }
    publish.find().count().then((c) => {
        publish.find().sort({_id: -1}).skip(s).limit(4).then((data) => {
            res.json({data: data , count:c})
        })
    })

})
//删除信息
router.get('/delete',(req,res,next)=>{
    console.log(req.query)
    publish.remove(req.query).then(()=>{
        res.json({msg:'删除成功'})
    })
})
module.exports = router;
