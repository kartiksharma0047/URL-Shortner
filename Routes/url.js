import express from "express";
import {generateNewShortURL, handleGetAnalytics } from '../Controllers/url.js'

const URLRouter=express.Router();

// Here a short url is generated and returns shortened URL(Example :- example.com/random-id) 
URLRouter.post('/',generateNewShortURL);

URLRouter.get("/analytics/:shortId",handleGetAnalytics)

export default URLRouter;