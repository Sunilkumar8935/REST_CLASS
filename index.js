const express=require("express");
const path = require("path");
const app=express();//app-object hai
const port=8080;
//unique uuid create
const {v4:uuidv4} =require('uuid');
//method override
const methodOverride=require("method-override");


app.use (express.urlencoded({extended:true}));///url me koi data ko parse kar pae
//method override
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static (path.join(__dirname,"public")));
//data base 
let posts=[
    {
        id:uuidv4 (),
        username:"apnacollege",
        content:"i love coding",
    },
    {
        id:uuidv4 (),
        username:"Sunil Kumar",
        content:"Hard work is importannt for achieve sucess",
    },
    {
        id:uuidv4 (),
        username:"apnacollege",
        content:"i got selected for my first internship",
    },

 ];
 

// route hai quora post page
app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts});
});

// index routeform create 
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

//implement ex add new post
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();

    posts.push({id,username,content});
    //res.send("post request working");
    res.redirect("/posts");
});
//show route
app.get("/posts/:id",(req,res)=>{
//retrive id ko 
   let {id}=req.params;
   console.log(id);
   //find function used karenge id ke liye individual post ke liye
   let post= posts.find((p) => id === p.id);
   //console.log(post);
   //res.send("request working");
   res.render("show.ejs",{post});
});
//update route
app.patch("/posts/:id",(req,res)=>{
let {id}=req.params;
//req body print
let newContent =req.body.content;
//update
  // console.log(newContent);
  let post= posts.find((p) => id === p.id);
  post.content=newContent;
  console.log(post);

    res.redirect("/posts");
});
//edit
app.get("/posts/:id/edit",(req,res)=>{
   let {id}=req.params;
   let post= posts.find((p) => id === p.id);
   console.log(post);
   res.render("edit.ejs",{post});
});

//delete
app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
    posts= posts.filter((p) => id !== p.id);
   res.redirect("/posts");  
});



app.listen(port,()=>{
    console.log("listening to port:8080");
    //console.log('app is listening on ${port}');
});