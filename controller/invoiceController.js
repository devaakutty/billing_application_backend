const invoice= require("../models/invoice");

//create invoice

exports.createInvoice = async(req , res) =>{
    try{
        const { invoiceNumer, customer, items , tax , discount } =req.body;
        //calculate Subtotal
        let subTotal = 0;
        items.forEach(item =>{
            item.total = item.quantity * item.price;
            subTotal += item.total;
        });

        //calculate grand total
        const grandTotal = subTotal + tax - discount;

        const invoice = new invoice({
            invoiceNumer,
            customer,
            items,
            subTotal,
            tax,
            discount,
            grandTotal,
            createBy: req.user.id
        });
        await invoice.save();
        res.status(201).json({message:"Invoice created Successfully",invoice });
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getInvoice = async(req , res ) =>{
    try{
        const invoice = await invoice.find();
        res.json(invoice);
    }catch(err){
        res.status(500).json({error : err.message })
    }
};