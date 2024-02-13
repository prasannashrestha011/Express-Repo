const Router=require('express')
const router=Router()
const products=require('../product.js')
const {checkSchema,validationResult,matchedData}=require('express-validator')
const productSchema=require('../productschema/schema.js')
const userSchema=require('../mongodb/schema/productschema.js')
router.post('/add/product',checkSchema(productSchema),(req,res)=>{
    const Detect=validationResult(req)
    const Data=matchedData(req)
    try{
        if(!Detect.isEmpty()) throw new Error('not processing')
        console.log(Data)
        const newProduct= new userSchema(Data)
        const addedProduct=newProduct.save()
        console.log(`${addedProduct.product} has been added to Database`)

    }
    catch(err){
        console.log(err)
      
    }
router.post('/search',checkSchema(productSchema),async(req,res)=>{
    const Data=matchedData(req)
    const findProduct= await userSchema.findOne({product})
    if(!findProduct) return res.status(400).send("Product not found!!")
    res.send(findProduct)
})
    
    res.status(200).send('Product has been added to collection')
})
module.exports=router