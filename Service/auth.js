import jwt from 'jsonwebtoken';

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    }
    ,process.env.JWT_SECRET);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return null;
    }
}

export {setUser,getUser};