const {Router}= require('express')
const{query,checkSchema,validationResult}=require('express-validator')
const querySchema=require('../query.js')
const useLOG=require('../static.js')
const router=Router()
router.get('/users',checkSchema(querySchema),(req,res)=>{
    const ErrorDetect=validationResult(req)
    if(!ErrorDetect.isEmpty) return res.sendStatus(400)
    console.log(ErrorDetect)
    const Data=req.body
    const filter=req.query.filter;
    const value=req.query.filter;
    if(!filter && !value) return res.sendStatus(400).send("Bad request")
    if(filter && value){
        const filterArr=userLOG.filter((user)=>{
            return user[filter].includes(value)
        })
        res.send(filterArr)
    }

})
module.exports=router;