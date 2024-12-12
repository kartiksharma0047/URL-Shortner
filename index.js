import express from "express";
import URLRouter from './Routes/url.js'
import connectToMongoDB from './connect.js';
import URL from './Models/url.js'
import path from 'path'
import staticRoute from './Routes/staticRouter.js'

const app=express();
const PORT=8000;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log('MongoDb Connected')});

app.set('view engine',"ejs");      // Here EJS template is set up
app.set('views',path.resolve("./Views"));    // Here my Server is getting the path of HTML files

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/url',URLRouter);
app.use("/",staticRoute)

app.get("/test",async (req,res)=>{
    const allURL = await URL.find({});
    return res.render('home',{urls:allURL})
})

app.get('/url/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId 
    },{$push:{
        visitHistory:{
            timeStamp:Date.now()
        }
    }})
    res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>console.log(`Server Started at PORT : ${PORT}`));