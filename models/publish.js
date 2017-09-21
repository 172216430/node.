/**
 * Created by Administrator on 2017/9/20.
 */
var mongoose = require('mongoose');
var PublishSchema = mongoose.Schema({
    publish:String,
    name:String
})
var  publish = mongoose.model('publish',PublishSchema)
module.exports  = publish