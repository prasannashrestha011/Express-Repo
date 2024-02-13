const passport=require('passport')
const strategy=require('passport-local')
const userLOG=require('../static.js')
const database=require('../mongodb/schema/schema.js')
const {comparePassword}=require('./hash.js')
passport.use(new strategy(async (username,password,done)=>{
    try{
        const findUser=await database.findOne({username})
        if(!findUser) throw new Error('User not found')
        if(!comparePassword(password,findUser.password)) throw new Error('Invalid password,Please try again')
        console.log("User authenticated")
        done(null,findUser)
    }
    catch(err){
        done(err,null)
    }

}))
passport.serializeUser((user,done)=>{
    console.log('Inside the serialization')
    console.log(user)
    console.log(typeof user.id)
    done(null,user.id)
})

passport.deserializeUser( async( userID,done)=>{

    console.log('Inside of deserialized function')
    console.log(userID)
    try{
        const findUser= await database.findById(userID)
        if(!findUser) throw new Error('User not FOUND')
        
        done(null,findUser)
    }
    catch(err){
        done(err,null)
    }
})
    module.exports=passport