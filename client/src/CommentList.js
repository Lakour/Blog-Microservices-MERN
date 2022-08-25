import React, {useState,useEffect} from 'react';
import axios from 'axios';

 function CommentList({comments}) {
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  //gives back an array of all the values in posts
  const renderedComments =comments.map(comment => {
    return (
      <li key={comment.id}> {comment.content}</li>
     
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
