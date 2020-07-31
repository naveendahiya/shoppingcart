const express=require('express');

const app=express();

const mongoose=require('mongoose')


mongoose.connect('mongodb+srv://user1:pTLecUakR9PyV8ZF@cluster0.opobk.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
    app.listen(3000);
    console.log('connected to mongodb')
})
.catch(err=>{
    console.log(err)
})
