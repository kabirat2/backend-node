const mongoose = require("mongoose")

const productschema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
        trim :true
    },
    productDescription: {
        type: String,
        require: true
    },
    productPrice: {
        type: String,
        require: true
    }, productImage: {
        type: String,
        require: true
    }, productCategory: {
        type: String,
        require: true,
        enum :["Electronic","foodstuff","fashion","fragrance"]
    }
},{timestamps :true})

const productmodel = mongoose.model("product", productschema)

module.exports = productmodel