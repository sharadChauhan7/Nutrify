import jwt from 'jsonwebtoken'
export const isLogin = async (req,res,next)=>{
    const {authToken} = req.cookies;
    if(!authToken){
        res.status(401).send({redirectUrl:"/auth"});
    }
   const result =  jwt.verify(authToken,'meninblack');
   const {user}  = result;
   req.user = user;
    next();
}