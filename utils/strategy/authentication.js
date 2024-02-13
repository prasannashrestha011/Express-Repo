const passport=require('passport')
const strategy=require('passport-local')
const userLOG=require('../static.js')
passport.use(new strategy((username,password,done)=>{
    try{
        const findUser=userLOG.find((user)=>{
                return user.username==username
        })
        if(!findUser) throw new Error('User not found')
        if(findUser.password!=password) throw new Error('Invalid password,Please try again')
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
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{

    console.log('Inside of deserialized function')
    console.log(id)
    try{
        const findUser=userLOG.find((user)=>{
                return user.id==id
        })
        done(null,findUser)
    }
    catch(err){
        done(err,null)
    }
})
    module.exports=passport