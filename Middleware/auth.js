import { getUser } from "../Service/auth.js";

async function restrictToLoggedInUserOnly(req,res,next) {
    const userUid=req.cookies?.sessionId;
    if(!userUid){
        return res.redirect("/login");
    }
    const user= getUser(userUid);
    if(!user){
        return res.redirect("/login");
    }
    req.user=user;
    next();
}

async function checkAuth(req,res,next) {
    const userUid=req.cookies?.sessionId;
    
    const user= getUser(userUid);
    
    req.user=user;
    next();
}

export {restrictToLoggedInUserOnly,checkAuth};