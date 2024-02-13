const Schema={
    product:{
        isLength:{
            options:{
                max:10,
                min:3
            },
            errorMessage:"Product name characters should be between 3-10"
        },
        notEmpty:{
            errorMessage:"Please enter your product name!"
        }

    },
    price:{
        notEmpty:{
            errorMessage:"Price should be in integer form"
        }
    }
}
    module.exports=Schema