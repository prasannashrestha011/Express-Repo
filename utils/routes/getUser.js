const Router=require('express')
const router=Router()

const userLOG=require('../static.js')
const {checkSchema,validationResult,matchedData}=require('express-validator')
const Schema=require('../schema.js')
const UserSchema=require('../mongodb/schema/schema.js')// database document structure
// passport authenticaton
const passport=require('passport')
const Strategy=require('passport-local')
require('../strategy/authentication.js')
//hash
const {hashPassword}=require('../strategy/hash.js')
router.post('/getUser',checkSchema(Schema),passport.authenticate('local'),(req,res)=>{
    const Detect=validationResult(req)
    if(!Detect.isEmpty()) return res.send(Detect.array())
    res.send(`Authenticaton sucessful`)
})
router.post('/user/create',checkSchema(Schema),async(req,res)=>{
    const Detect=validationResult(req)
    if(!Detect.isEmpty()) return res.send(Detect.array())
    const data=matchedData(req)
    data.password=await hashPassword(data.password)
    console.log(data.password)
    const newUser= new UserSchema(data)
    const savedUser= await newUser.save()
    console.log(savedUser)
    res.status(200).send("Account has been created and stored in our database")
})

module.exports=router;