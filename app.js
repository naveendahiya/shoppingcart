const express=require('express');

const app=express();
const User= require('./models/user')
const mongoose=require('mongoose')
const bodyParser = require('body-parser')
const adminRouters=require('./routers/admin')
const shopRouters=require('./routers/shop')
app.use(bodyParser.json({ type: 'application/json' }))

app.use((req,res,next)=>{
    User.findById('5f2aebfe49198d18f8af0c5b')
    .then(user=>{
        //storing user object in req 
        req.user=user
        next();
    })
    .catch(err=>{
        console.log(err)
    })
})




app.use('/shop',shopRouters)
app.use('/admin',adminRouters)

mongoose.connect('mongodb+srv://user1:pTLecUakR9PyV8ZF@cluster0.opobk.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
User.findOne().then(user=>{
    if(!user){
        const user=new User({
            name:'ayushi',
            email:'ayushi@gmail.com',
            cart:{
                items:[]
            }
        });
        user.save();
    }
})
    
     app.listen(8000);
    console.log('connected to mongodb');
})
.catch(err=>{
    console.log(err);
})
