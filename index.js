const express=require("express");
const app=express();
const port =8080;
const path=require("path");
const { v4: uuidv4 }=require('uuid');
const methodOverride=require("method-override");

app.use(express.urlencoded({extend:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id: uuidv4(),
        username : "apnacollege",
        content:"I love coding!",
    },
    {
        id: uuidv4(),
        username : "Arhant",
        content:"Hard work is important to achieve success",
    },
    {
        id: uuidv4(),
        username : "random",
        content:"got selected for a internship",
    }
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    // posts.push({username,content});
    // res.send("post request working");
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id);
    console.log(post);
    // res.send("request working");
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let newcontent=req.body.content;
    // console.log(newcontent);
    let post=posts.find((p)=> id===p.id);
    post.content=newcontent;
    console.log(post);
    // res.render("show.ejs",{post});
    // res.send("patch request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

// app.get("/posts/:id/delete",(req,res)=>{
//     let {id}=req.params;
//     let post=posts.find((p)=> id===p.id);
//     let idx=posts.indexOf(post);
//     posts.splice(idx,1);
//     res.redirect("/posts");
// }); ***********aisa bhi ho sakta hai*********

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening to port : 8080");
});