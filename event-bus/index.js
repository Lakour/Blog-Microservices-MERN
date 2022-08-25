const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res, next) => {
  const event = req.body;
  await axios.post("http://localhost:4001/events", event) //comments
  await axios.post("http://localhost:4000/events", event) //posts
  await axios.post("http://localhost:4002/events", event) //query
  await axios.post("http://localhost:4003/events", event) //moderation

  res.send({status: "OK"})
})


app.listen(4005, ()=>{
  console.log('Listening on port 4005')
})