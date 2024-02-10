const express= require('express')
const app=express()
app.use(express.json())
const PORT=3000
const {query,validationResult,body,matchedData,checkSchema}=require('express-validator')
const schema=require('./utils/schema.js')
// Defining a middlware function 
const logMiddleware=(req,res,next)=>{
    const ID=parseInt(req.params.id);
    if(isNaN(ID)) return res.sendStatus(400);
    if(ID<0) return res.sendStatus(404);
     const findUser= userLOG.findIndex((user)=>{
         return user.id===ID;
     })
    req.FindUser=findUser;
     next();
}

const userLOG=[
    { id :1, user:"ram", address:"Bhaktapur"},//0
    { id :2, user:"sita", address:"Kathmandu"},//1
    { id :3, user:"hari", address:"Palpa"}//2
]

app.get('/',(req,res)=>{
	res.send({ msg: "Hello!"});
   
});
    // query request 
app.get('/users',
query('filter')
.isString().withMessage("The filter will only accept string ")
.notEmpty().withMessage("The filter should not be empty")
.isLength({min:3,max:10}).withMessage("The character must be between 3-10 characters")
,(req,res)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()) return res.status(400).send(errors.array())
    console.log(errors) 

    const Data= matchedData(req);
    console.log(Data)
    const filter=req.query.filter;
    const value=req.query.value;
    console.log(filter)
    console.log(value)
    if(!filter && !value) return res.send('bad request!, Try again')
    if(filter && value)
    {
        const filteredArr=userLOG.filter((user)=>{
          return user[filter].includes(value)
        })
        res.send(filteredArr)
    }
})
    // request parameter
app.get('/users/:id',logMiddleware,(req,res)=>{
        const userID=req.FindUser;
        res.send(userLOG[userID]);
      

})
// post method
app.post('/users', checkSchema(schema),(req,res)=>{
    const Error=validationResult(req)
    const Data= req.body
    
    console.log(Data)
    if(!Error.isEmpty()) return res.status(400).send(Error.array())
    console.log(Error)
 
    const newUser={ id:userLOG[userLOG.length-1].id+1,...Data}
    userLOG.push(newUser);
    return res.send(newUser)
    res.send('Data successfully received')
})
app.get('/grades',(req,res)=>{
    res.send(
        [
            { roll:1, Grade:'A'},
            { roll:2, Grade:'B'},
            { roll:3, Grade:'C'}
        ]
    )
})


// put request method
app.put('/users/:id',logMiddleware,(req,res)=>{
    const Data=req.body;
    const userID=req.FindUser;
    userLOG[userID]={id:userLOG[userID].id,...Data}
    res.sendStatus(200)
})
// patch request method
app.patch('/users/:id',logMiddleware,(req,res)=>{
    const Data=req.body;
    const userID=req.FindUser;
    userLOG[userID]={...userLOG[userID],...Data}
    res.sendStatus(200)
})
   


// delete request method
app.delete('/users/:id',logMiddleware,(req,res)=>{
    const targetedID=req.FindUser;
    userLOG.splice(targetedID,1);
    res.sendStatus(200).send("Deleted the data sucessfully");
})
app.get('/all',(req,res)=>{
    res.send(userLOG)
})

app.listen(PORT,()=>{
	console.log('Server has been executed ')
})
