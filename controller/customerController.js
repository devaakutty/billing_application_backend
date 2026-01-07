const customer = require("../models/customer");

//Create Customer

exports.createCustomer = async(req , res) =>{
    try{
        const{name, phone_Number, email }= req.body;

        const existingCustomer = await customer.findOne({email});
        if(existingCustomer){
            return res.status(400).json({message :"Customer already Exists"});
        }

        new customer({name, phone_Number});
        await customer.save();

        res.status(201).json({success: true, message : "customer create successfully",customer});
    }catch(error){
        res.status(500).json({error : error.message});
    }
};

//Get All Customer

exports.getCustomer = async(req, res) =>{
    try{
        const customer = await customer.find();
        res.json(customer);
    }catch(error){
        res.status(500).json({error :error.message})
    }
};

//Get Customer By Id

exports.getCustomerById = async(req , res) =>{
    try{
        const customer = await customer.findById(req.params.id);
        if(!customer)
            return res.status(404).json({message : "Customer not found"});
        res.json(customer);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};