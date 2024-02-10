const schema={
    user:{
        isLength:{
            option:{
                min:5,
                max:32,
            }
        },
        isString:{
            errorMessage:" info should be in string form"
        },
        notEmpty:{
            errorMessage:" info should not be empty"
        }
    },
    address:{
        isLength:{
            option:{
                min:3,
                max:32
            }
        },
        isString:{
            errorMessage:" Address should be in a string form"
        },
        notEmpty:{
            errorMessage:" Please insert you address"
        }
    }
}
module.exports= schema