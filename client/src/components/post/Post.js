import React, { useContext } from 'react';
import './post.css';
import { Cancel } from '@material-ui/icons';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const Post = ({
  post: { _id, desc, image, likes, comments, createdAt, name, avatar },
}) => {
  const { addLike, deletePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const deleteHandler = () => {
    deletePost(_id);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/users/${name}`}>
              <img
                src={avatar ? pf + avatar : pf + 'person/noAvatar.png'}
                alt=''
                className='postProfileImg'
              />
            </Link>
            <span className='postUsername'>{name}</span>
            <span className='postDate'>{format(createdAt)}</span>
          </div>
          <div className='postTopRight'>
            {user && user.username === name && (
              <Cancel onClick={deleteHandler} />
            )}
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{desc}</span>
          <img src={pf + image} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              src={`${pf}like.png`}
              alt=''
              className='likeIcon'
              onClick={(e) => addLike(_id)}
            />
            <img
              src={`${pf}heart.png`}
              alt=''
              className='likeIcon'
              onClick={(e) => addLike(_id)}
            />
            <span className='postLikeCounter'>
              {likes.length} people reacted to this post
            </span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{comments.length} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
