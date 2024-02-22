const express = require ("express")
const { createProduct } = require("../Controllers/Productcontroller")
 const router = express.Router()



 router.post("/uploadProduct", createProduct)


 module.exports = router