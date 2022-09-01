const express = require("express");
const app = express();
const {randomBytes} = require("crypto")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")

app.use(cors());
app.use(bodyParser.json());

const posts = {};



app.get("/posts", (req,res,next) =>{
res.send(posts)
})

app.post("/posts/create", async (req,res,next) =>{
//randomly generate an id     
const id = randomBytes(4).toString("hex");
const {title} = req.body;

posts[id] = {id, title};

await axios.post("http://event-bus-srv:4005/events", {
  type: "PostCreated", data: {id, title}
})

res.status(201).send(posts[id])

})
app.post('/events', (req,res,next)=>{
  console.log("received event" , req.body.type)
  res.send({})
})

app.listen(4000, ()=>{
  console.log("v6")
  console.log("Server is listening on port 4000")
})