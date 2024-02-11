const express= require('express')
const app=express()
app.use(express.json())
const PORT=3000
const {query,validationResult,body,matchedData,checkSchema}=require('express-validator')
const schema=require('./utils/schema.js')
const querySchema = require('./utils/query.js');
// routes
const Routes=require('./utils/routes/rootroute.js')

const logMiddleware=require('./utils/middleware.js')//middleware function 
const userLOG=require('./utils/static.js') // users details

app.get('/',(req,res)=>{
	res.send({ msg: "Hello!"});
   
});

 app.use(Routes)

app.delete('/users/:id',logMiddleware,(req,res)=>{
    const targetedID=req.FindUser;
    userLOG.splice(targetedID,1);
    res.sendStatus(200).send("Deleted the data sucessfully");
})
app.get('/all',(req,res)=>{
    res.send(userLOG)
})
app.get('/users/:id',logMiddleware,(req,res)=>{
    const userID=req.FindUser;
    res.send(userLOG[userID]);
})

app.listen(PORT,()=>{
	console.log('Server has been executed ')
})