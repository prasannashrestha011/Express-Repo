const querySchema={
    filter:{
        isLength:{
            option:{
                max:15,
                min:2
            }
        },
        isString:{
            errorMessage:"The filter should be on string"
        },
        notEmpty:{
            errorMessage:"The filter should not be empty"
        }
    },
    value:{
        isLength:{
            option:{
                max:15,
                min:2,
            },
        isString:{
            errorMessage:" The value should be in string form"
        },
        notEmpty:{
            errorMessage:"Please insert your value"
        }
        }
    }
}
module.exports=querySchema;