
const { cloudinary } = require("../Config/cloudinary")
const productmodel = require("../Models/productmodel")


const createProduct = async (req, res) => {
    const { productName, productDescription, productPrice, productImage, productCategory } = req.body;

    if (!productName || !productDescription || !productPrice || !productImage || !productCategory) {
        
         res.status(400).send({ message: "All fields are required." });
      
    }else{
        try {
            // Upload image to Cloudinary
            const imageUpload = await cloudinary.uploader.upload(productImage, {folder:"productImages"});
            const productLink = imageUpload.secure_url;
            console.log("ImageLink : ", productLink)
            // Save product details to database
            const newProduct = await productmodel.create({
                productName,
                productDescription,
                productPrice,
                productImage:productLink,
                productCategory  
            });
            if (newProduct) {
                
                res.status(200).send({ message: "Product created successfully.", status:true });
            } else {
               res.status(400).send({message: "Product created not successfully.", status:true})
            }
            // return res.status(201).json({ message: "Product created successfully.", product: newProduct });
        } catch (error) {
            console.error("Server error:", error);
            return res.status(500).json({ message: "Server error.", error: error.message });
        }
    }

   
};



module.exports = { createProduct }