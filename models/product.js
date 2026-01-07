const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name :{type : String , required : true, trim : true },
    price :{type : Number , required : true },
    stock :{type : Number , required : true },
    image :{type : String , required : true, default : "" }
},{timestamps : true });

module.exports = mongoose.model("product" , productSchema);