import React, { useContext, useEffect, useRef, useState } from 'react';
import './share.css';
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@material-ui/icons';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

const Share = () => {
  const { user } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = new FormData();

    if (image) {
      newPost.append('image', image);
    }
    newPost.append('user', user._id);
    newPost.append('desc', desc.current.value);
    newPost.append('name', user.username);
    newPost.append('avatar', user.profilePicture);

    createPost(newPost);
    desc.current.value = '';
    setImage(null);
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            src={
              user && user.profilePicture
                ? pf + user.profilePicture
                : pf + 'person/noAvatar.png'
            }
            alt=''
            className='shareProfileImg'
          />
          <input
            placeholder={`What's on your mind, ${user && user.username} ?`}
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        {image && (
          <div className='shareImageContainer'>
            <img
              src={URL.createObjectURL(image)}
              alt=''
              className='shareImage'
            />
            <Cancel
              className='shareCancelImage'
              onClick={() => setImage(null)}
            />
          </div>
        )}
        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor={image} className='shareOption'>
              <PermMedia htmlColor='forestgreen' className='shareIcon' />
              <span className='shareOptionText'>Photo and Video</span>
              <input
                type='file'
                name='image'
                accept='.png, .jpeg, .jpg, .mp4, .mov, .wmv, .mkv'
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </label>
            <div className='shareOption'>
              <Label htmlColor='darkblue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='darkorange' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
