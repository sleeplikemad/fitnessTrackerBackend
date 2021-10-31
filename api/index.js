// create an api router

const express = require("express");
const apiRouter = express.Router();

// attach other routers from files in this api directory (users, activities...)
// const userRouter = require("./users");


apiRouter.get("/health", (req, res, next)=>{
    res.send({message: "Server is Up"})
})




// export the api router
module.exports = apiRouter
