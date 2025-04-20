const express= require('express');
const mongoose= require('mongoose');
const { type } = require('os');
const schema=mongoose.Schema;
const fbSchema= new schema({
    email:{
        type:String,required:true
    },
    text:{
        type:String
    },
    rating:{
        type:Number
    }


})

const fb= mongoose.model("fb",fbSchema);
module.exports=fb;