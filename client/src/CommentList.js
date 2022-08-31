import React, {useState,useEffect} from 'react';
import axios from 'axios';

 function CommentList({comments}) {
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   fetchComments();
  // }, []);



  //gives back an array of all the values in posts
  const renderedComments =comments.map(comment => {
    let content;

    if(comment.status === 'approved') {
      content = comment.content;
    }
    if(comment.status === 'pending'){
      content = "This comment is awaiting moderation"
    }
    if(comment.status === 'rejected'){
      content = "This comment has been rejected"
    }
    return (
      <li key={comment.id}> {content}</li>
     
    );
  });

  // const fetchComments = async () => {

  //  const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);  
  //    setComments(res.data);
  // };

  return (
    <ul >
      {renderedComments}
    </ul>
  );
}
export default CommentList;
