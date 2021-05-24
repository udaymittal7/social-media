import React, { useContext } from 'react';
import './comment.css';
import PostContext from '../../context/post/postContext';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import AuthContext from '../../context/auth/authContext';

const Comment = ({
  postId,
  comment: { _id: commentId, text, name, picture, user },
}) => {
  const { deleteComment } = useContext(PostContext);
  const { user: currentUser } = useContext(AuthContext);

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const deleteHandler = () => {
    deleteComment(postId, commentId);
  };

  return (
    <div className='comment'>
      <div className='commentWrapper'>
        <div className='commentLeft'>
          <Link to={`/users/${name}`}>
            <img
              src={picture ? pf + picture : pf + 'person/noAvatar.png'}
              alt=''
              className='commentProfileImg'
            />
          </Link>
          <span className='commentUsername'>{name}</span>
        </div>
        <div className='commentMiddle'>
          <span className='commentText'>{text}</span>
        </div>
        <div className='commentRight'>
          {currentUser && currentUser._id === user && (
            <Cancel onClick={deleteHandler} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
