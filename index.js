const express=require('express');
const app = express();
const mongoose= require('mongoose');
const methodOverride= require('method-override');
const path=require('path');
const ejsMate=require('ejs-mate')
app.engine('ejs', ejsMate);
const fb = require('./init')
//
app.set("view engine","ejs");
//path join for views,public
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/feed_back");
    console.log("mongodb connected")}

main();
const port=8082;
app.listen(port,()=>{
    console.log(`server is listening to the port ${port}`);
})

app.get("/home",(req,res)=>{
    res.render("listings/home.ejs")
    // res.send("welcome to the feedback root")
})

app.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
})
app.post("/new/add",async (req,res)=>{
    const temp = new fb(req.body.fb);
    await temp.save();
    console.log("saved : " ,temp);
    res.redirect("/new")
})

app.get("/all/:password",async (req,res)=>{
    let{password}=req.params;
    if(password==="valid"){
        const allfb=await fb.find({});
        res.render("listings/all.ejs",{allfb});
    }
    else{
        res.send("unauthorized access")
    }
})
app.delete("/fb/:id",async(req,res)=>{
    let {id}=req.params;
   await fb.findByIdAndDelete(id);
   res.send("deletion successful")

});

app.get("/admin",(req,res)=>{
    res.render("listings/adminLogin.ejs")
})

app.post("/adminLogin",async (req,res)=>{
    let {password}=req.body;
    if(password==="valid"){
        const allfb=await fb.find({});
        res.render("listings/all.ejs",{allfb});
    }
    else{
        res.send("unauthorized admin login attempt ")
    }
})