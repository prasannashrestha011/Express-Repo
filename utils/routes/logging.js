const Router=require('express')
const router=Router()
const passport=require('passport')
const strategy=require('passport-local')

require('../strategy/authentication.js')
router.post('/log',passport.authenticate('local'),(req,res)=>{
  
    res.send('Authentication sucessful')
})
module.exports=router