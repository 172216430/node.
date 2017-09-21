/**
 * Created by Administrator on 2017/9/14.
 */
//1.加载数据库模块
var mongoose = require('mongoose');
//2.连接数据库
mongoose.connect('mongodb://localhost/stu_zjh',{
    useMongoClient: true //加上一句配置参数即可.
});
//告诉mongoose，我使用的Promise是ES6标准中的promise.
mongoose.Promise = global.Promise;
//3.测试数据库是否连接成功
var db = mongoose.connection;
db.on('error',function(){
    console.log('数据库连接失败');
})
db.on('open',function(){
    console.log('数据库连接成功');
})