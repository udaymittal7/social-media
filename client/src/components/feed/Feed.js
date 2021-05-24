import React, { useContext, useEffect } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const Feed = ({ username }) => {
  const { getPostsTimeline, getPostsProfile, posts, profilePosts } =
    useContext(PostContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (username) {
      getPostsProfile(username);
    } else {
      getPostsTimeline();
    }
    //eslint-disable-next-line
  }, [username]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {user && user.username === username && <Share />}
        {user && !window.location.href.includes(`${username}`) && <Share />}
        {!username
          ? posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })
          : profilePosts.map((profilePost) => {
              return <Post key={profilePost._id} post={profilePost} />;
            })}
      </div>
    </div>
  );
};

export default Feed;
