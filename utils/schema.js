const Schema={
    username:{
        isLength:{
            options:{
                max:15,
                min:2
            },
            errorMessage:"User character should be in a range of 2 to 15"
        },
        notEmpty:{
            errorMessage:"Username should not be empty"
        }
    },
    password:{
        isLength:{
            options:{
                max:12,
                min:3
            },
            errorMessage:"Please fill out the password box"
        },
        notEmpty:{
            errorMessage:"Please insert your password"
        }
    }
}
module.exports=Schema