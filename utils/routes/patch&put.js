const Router=require('express')
const router=Router()
const userLOG=require('../static.js')
const logMiddleware=require('../middleware.js')
router.put('/users/:id',logMiddleware,(req,res)=>{
    const userID=req.FindUser;
    const Data=req.body;
    userLOG[userID]={id:userLOG[userID].id,...Data}
    res.send('New Data has been created on your current index');
    console.log(userLOG[userID]);
})
module.exports=router