/**
 * Created by Administrator on 2017/9/14.
 */
var mongoose = require('mongoose');
var LoginSchema = mongoose.Schema({
    name: String,
    passe: String,
    email: String
})
var  login = mongoose.model('login',LoginSchema)
module.exports  = login