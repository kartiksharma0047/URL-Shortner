import express from "express";
import URLRouter from './Routes/url.js'
import connectToMongoDB from './connect.js';
import URL from './Models/url.js'
import path from 'path'
import staticRoute from './Routes/staticRouter.js'
import userRouter from './Routes/user.js'
import cookieParser from 'cookie-parser'
import {restrictToLoggedInUserOnly,checkAuth} from './Middleware/auth.js'
import dotenv from 'dotenv';

dotenv.config();
const app=express();
const PORT=process.env.PORT;

connectToMongoDB(process.env.MONGO_URI).then(()=>{console.log('MongoDb Connected')});

app.set('view engine',"ejs");      // Here EJS template is set up
app.set('views',path.resolve("./Views"));    // Here my Server is getting the path of HTML files

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.use('/url',restrictToLoggedInUserOnly,URLRouter);
app.use("/",checkAuth,staticRoute);
app.use('/user',userRouter);

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