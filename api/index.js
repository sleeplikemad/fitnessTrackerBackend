// create an api router

const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET = "neverTell"} = process.env

// attach other routers from files in this api directory (users, activities...)
const userRouter = require("./users");

const {
    getUserById,
} = require("../db")

apiRouter.get('/health', async (req, res)=>{
    try{
      res.send({message:"connected!"})
    }catch(error){
        console.error(error);
        next(error)
    }
});

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      
      try {
        const parsedToken = jwt.verify(token, JWT_SECRET);
        
        const id = parsedToken && parsedToken.id
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch (error) {
        next(error);
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

// export the api router
module.exports = apiRouter

apiRouter.use('/users', userRouter)