const Router=require('express')

const route=Router()
const getRoute=require('./get.js')
const putpatch=require('./patch&put.js')
const postRoute=require('./post.js')
route.use(getRoute)
route.use(putpatch)
route.use(postRoute)

module.exports=route