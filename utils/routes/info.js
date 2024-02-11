const Router=require('express')
const router=Router()
const userLOG=require('../static.js')
router.get('/info',(req,res)=>{
    if(req.signedCookies.Hello=='World')
    {
        res.send(userLOG)
    }
    else{
        res.sendStatus(403)
    }
})
module.exports=router