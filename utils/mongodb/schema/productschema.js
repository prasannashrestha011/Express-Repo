const mongoose=require('mongoose')
const product= new mongoose.Schema({
    product:{
        type:String,
        unique:true,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model('product',product)