const bcrypt=require('bcrypt')
const saltRound=10
const hashPassword=async(password)=>{
        const salt=await bcrypt.genSalt(saltRound)
        return bcrypt.hash(password,salt)
}
const comparePassword=(plain,hash)=>{
    return bcrypt.compareSync(plain,hash)
}
module.exports={hashPassword,comparePassword}