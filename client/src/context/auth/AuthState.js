import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_START,
  REGISTER_START,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ERRORS,
  USER_LOADED,
  GET_USER,
  AUTH_ERROR,
  LOGOUT,
  GET_FRIENDS,
  FOLLOW_USER,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    profileUser: null,
    loading: false,
    error: null,
    friends: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: LOGIN_START,
    });
    try {
      const res = await axios.post('/auth/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();

      toast.success('Logged In Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message,
      });

      if (
        err.response.data.message === 'User not found' ||
        err.response.data.message === 'Wrong password'
      ) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: REGISTER_START,
    });
    try {
      const res = await axios.post('/auth/register', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();

      toast.success('Registered Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message,
      });

      if (err.response.data.message === 'User with that email already exists') {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    }
  };

  // Get user
  const getUser = async (username) => {
    try {
      const res = await axios.get(`/users/${username}`);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Follow user
  const followUser = async (id, follow) => {
    try {
      const res = await axios.put(`/users/follow/${id}`);
      dispatch({
        type: FOLLOW_USER,
        payload: { followings: res.data, id, follow },
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Get user friends
  const getFriends = async (username) => {
    try {
      const res = await axios.get(`/users/${username}/friends`);
      dispatch({
        type: GET_FRIENDS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });

    toast.success('Logged Out', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        friends: state.friends,
        profileUser: state.profileUser,
        loading: state.loading,
        error: state.error,
        login,
        register,
        clearErrors,
        loadUser,
        logout,
        getUser,
        getFriends,
        followUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
