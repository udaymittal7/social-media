import React, { useContext, useRef } from 'react';
import './commentForm.css';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import { Link } from 'react-router-dom';

const CommentForm = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const { addComment } = useContext(PostContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const text = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text.current.value);
    addComment(postId, formData);
    text.current.value = '';
  };

  return (
    <div className='commentForm'>
      <form className='commentFormWrapper' onSubmit={submitHandler}>
        <div className='commentFormImage'>
          <Link to={`/users/${user && user.username}`}>
            <img
              src={
                user && user.profilePicture
                  ? pf + user.profilePicture
                  : pf + 'person/noAvatar.png'
              }
              alt=''
              className='commentFormProfileImg'
            />
          </Link>
          <span className='commentFormUsername'>{user && user.username}</span>
        </div>
        <div className='commentFormInput'>
          <input
            placeholder='Leave a comment'
            className='commentFormInputText'
            ref={text}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
