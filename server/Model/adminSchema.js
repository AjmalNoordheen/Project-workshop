const mongoose = require('mongoose')

const AdminShema=  new mongoose.Schema({
    email:{
        type    :String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
})

const adminModel = mongoose.model('admin',AdminShema)
module.exports = adminModel