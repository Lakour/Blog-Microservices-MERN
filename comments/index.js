const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", async (req, res, next) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content: content, status:"pending"});

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content: content, postId: req.params.id, status: "pending"}
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res, next) => {
  console.log("received event", req.body.type);

  const {type, data} = req.body;

  if (type === "CommentModerated"){
    const {postId, id, status, content} = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment)=>{
      return comment.id === id;
    })
    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated", data: {id, status, postId, content}
    })
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Server is listening on Port 4001");
});
