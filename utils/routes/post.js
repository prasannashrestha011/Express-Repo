const Router=require('express')
const router=Router()
const postSchema=require('../schema.js')
const userLOG=require('../static.js')
const {checkSchema,validationResult}=require('express-validator')
router.post('/users',checkSchema(postSchema),(req,res)=>{
    const ErrorDetect=validationResult(req)
    if(!ErrorDetect.isEmpty()) return res.sendStatus(400)
    const Data=req.body
    const newUser={id:userLOG[userLOG.length-1].id+1,...Data}
    userLOG.push(newUser)
    console.log(newUser)
    res.send("Data created sucessfully")
        
})
module.exports=router