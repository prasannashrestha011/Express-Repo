const Router=require('express')

const route=Router()
const getRoute=require('./get.js')
const putpatch=require('./patch&put.js')
const postRoute=require('./post.js')
const infoRoute=require('./info.js')
const log=require('./logging.js')
route.use(getRoute)
route.use(putpatch)
route.use(postRoute)
route.use(infoRoute)
route.use(log)

module.exports=route