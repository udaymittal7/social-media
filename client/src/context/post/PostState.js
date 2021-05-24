import React, { useReducer } from 'react';
import PostContext from './postContext';
import postReducer from './postReducer';
import axios from 'axios';
import {
  GET_POSTS_TIMELINE,
  GET_POSTS_PROFILE,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const PostState = (props) => {
  const initialState = {
    posts: [],
    post: null,
    profilePosts: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get Timeline Posts
  const getPostsTimeline = async () => {
    try {
      const res = await axios.get('/posts/timeline');

      dispatch({
        type: GET_POSTS_TIMELINE,
        payload: res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }),
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response,
        },
      });
    }
  };

  // Get Profile Posts
  const getPostsProfile = async (user) => {
    try {
      const res = await axios.get(`/posts/profile/${user}`);

      dispatch({
        type: GET_POSTS_PROFILE,
        payload: res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        }),
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

  // Update Post Likes
  const addLike = async (postId) => {
    try {
      const res = await axios.put(`/posts/like/${postId}`);

      dispatch({ type: UPDATE_LIKES, payload: { likes: res.data, postId } });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);

      dispatch({ type: DELETE_POST, payload: id });
      toast.success('Post Deleted', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
      toast.error('Unable to Delete Post. Please try again', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  // Create A New Post
  const createPost = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post('/posts/', formData, config);

      dispatch({ type: ADD_POST, payload: res.data });
      toast.success('New Post Created', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err.response.statusText,
          status: err.response.status,
        },
      });
      toast.error('Unable to Create New Post. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  // Add Comment
  const addComment = async (postId, formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.put(`/posts/comment/${postId}`, formData, config);

      dispatch({ type: ADD_COMMENT, payload: { comments: res.data, postId } });
      toast.success('Comment Added', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err,
        },
      });
      toast.error('Unable to comment on post. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  // Delete Comment
  const deleteComment = async (postId, commentId) => {
    try {
      const res = await axios.delete(`/posts/comment/${postId}/${commentId}`);

      dispatch({ type: REMOVE_COMMENT, payload: { postId, commentId } });
      toast.success('Comment Deleted', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: POST_ERROR,
        payload: {
          message: err,
        },
      });
      toast.error('Unable to delete comment. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        profilePosts: state.profilePosts,
        loading: state.loading,
        error: state.loading,
        getPostsTimeline,
        getPostsProfile,
        addLike,
        deletePost,
        createPost,
        addComment,
        deleteComment,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
