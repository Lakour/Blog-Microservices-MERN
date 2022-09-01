import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

function PostList() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  //gives back an array of all the values in posts
  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>
            {post.title}
          </h3>
        </div>
        <CommentList comments={post.comments}/>
        <CommentCreate postId={post.id}/>
      </div>
    );
  });

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");
    setPosts(res.data);
  };

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}

export default PostList;
