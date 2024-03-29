const express= require('express')
const app=express()
app.use(express.json())
const PORT=3000
// database
const mongoose=require('mongoose')
const userSchema=require('./utils/mongodb/schema/schema.js')
mongoose.connect('mongodb://localhost:27017/UsersData').then(()=>{
    console.log("Data base has been executed")
}).catch((err)=>{
    console.log(err)
})
app.post('/create',async(req,res)=>{
    try{
        const { body} = req;
        const newUser = new userSchema(body);
        const saveUser = await newUser.save();
        
        console.log(saveUser)
        res.send('data saved to database')
    }
    catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})


//
const parsecookie=require('cookie-parser')
const session=require('express-session')
app.use(session({
    secret:"Hello123",
    saveUninitialized:false,
    resave:false
})) 

const passport=require('passport')
const strategy=require('passport-local')
require('./utils/strategy/authentication.js')


const {query,validationResult,body,matchedData,checkSchema}=require('express-validator')
const schema=require('./utils/schema.js')
const querySchema = require('./utils/query.js');
// routes
const Routes=require('./utils/routes/rootroute.js')

const logMiddleware=require('./utils/middleware.js')//middleware function 
const userLOG=require('./utils/static.js') // users details
app.use(parsecookie('HelloWorld')); // Use cookie-parser middleware
// passport middleware//
app.use('/user/auth',passport.authenticate('local'),(req,res)=>{
    res.send('User has been authenticated')
})


// session
app.use(session({
    secret: 'coder-session',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
app.get('/create',(req,res)=>{
    const sessionID=req.session.id
    console.log(sessionID)
    res.send(`Your session ID has been created ${sessionID}` )
})
// mutiple routes
 app.use(Routes)

app.delete('/users/:id',logMiddleware,(req,res)=>{
    const targetedID=req.FindUser;
    userLOG.splice(targetedID,1);
    res.sendStatus(200).send("Deleted the data sucessfully");
})
app.get('/all',(req,res)=>{
    res.send(userLOG)
})
app.post('/auth',(req,res)=>{
    const {body:{user,address}}=req;
    const findUser=userLOG.find((User)=>{
         return User.user==user;
    })
    if(findUser.address!=address) return res.status(401).send("Invalid info")
    req.session.user=findUser
    console.log(req.sessionID)
    console.log(req.session)
    res.send(findUser)
})
app.post('/cart',(req,res)=>{
    if(!req.session.user) return res.status(401).send('Please authenticate your ID')
    const {body}=req;
    const {cart}=req.session;
    if(cart)
    {
        cart.push(body)
    }
    else{
        req.session.cart=[body]
    }
    res.send("Your product has been added to chart")
})
app.get('/cart',(req,res)=>{
    if(!req.session.user) return res.status(401).send('Please authenticate yourself') // authentication
    const { cart }=req.session
    res.send(cart)
})
app.get('/users/:id',logMiddleware,(req,res)=>{
    const userID=req.FindUser;
    res.send(userLOG[userID]);
})

app.listen(PORT,()=>{
	console.log('Server has been executed ')
})