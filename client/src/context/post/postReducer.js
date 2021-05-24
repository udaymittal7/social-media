import {
  DELETE_POST,
  GET_POSTS_PROFILE,
  GET_POSTS_TIMELINE,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS_TIMELINE:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POSTS_PROFILE:
      return {
        ...state,
        profilePosts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: action.payload.comments,
              }
            : post
        ),
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: {
          ...state.posts,
          comments: state.posts.map((post) =>
            post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            )
          ),
        },
      };

    default:
      return state;
  }
};
