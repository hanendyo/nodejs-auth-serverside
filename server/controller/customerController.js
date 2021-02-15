const customerModel = require('../models/customerModel')

exports.customer = async (req, res, next) => {
    try {
        const {name} = req.body;

        const newCustomer = new customerModel({
            name: name
        })

        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer)
        
    } catch (err) {
        console.error(err);
        res.status(500).send()  
    }
}