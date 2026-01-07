const { json } = require("express");
const product = require("../models/product");

//Add Products

exports.addProduct = async(req , res) =>{
    try{
        const product = new product(req.body);
        await product.save();
        res.json(product);
    }catch(err){
        res.status(500).json({error :err.message});
    }
};

//GET All products

exports.getProduct = async (req , res) =>{
    try{
        const products = new product.find();
        res.json(products);
    }catch(err){
        res.status(500).json({error :err.message});
    }
};