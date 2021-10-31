// create the express server here
const express = require("express");
const client = require("./db/client")

const PORT = process.env.PORT || 3000
const server = express()

const cors = require("cors");
const { restart } = require("nodemon");

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(cors());
server.use(express.json()) 
server.use("/api", require("./api"))

server.use((err, req, res, next)=>{
    res.status(404)
    if(req.accepts("html")){
        res.render("404", { url: req.url })
        return
    }
    if(req.accepts("json")){
        res.join({ error: "Not Found" })
        return
    }
    res.type("txt").send("Not Found")
})


server.use((err, req, res, next)=>{
    console.error(err.stack)
    restart.status(500).send("Something broke!")
})


server.listen(PORT, ()=>{
    console.log("Server is up and running!")
    client.connect()
})