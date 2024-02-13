const Router=require('express')
const router=Router()

const userLOG=require('../static.js')
const {checkSchema,validationResult}=require('express-validator')
const Schema=require('../schema.js')
router.post('/getUser',checkSchema(Schema),(req,res)=>{
    const Detect=validationResult(req)
    if(!Detect.isEmpty()) return res.send(Detect.array())
    const {body:{username,password}}=req;
    const findUser=userLOG.find((user)=>{
        return user.username==username
    })
    if(!findUser)return res.status(404).send("NOT FOUND")
    if(findUser.password!=password) return res.sendStatus(401)
    res.send(`Authenticaton sucessful:${findUser.username}`)
})
module.exports=router;