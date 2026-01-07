const mongoose = require("mongoose");

const customerShema = new mongoose.Schema({
    name :{type : String , required : true },
    phone_number :{type : String , required : true },
    email :{type : String , required : true, unique:true }
},{timestamps : true});

module.exports = mongoose.model("customer" , customerShema);