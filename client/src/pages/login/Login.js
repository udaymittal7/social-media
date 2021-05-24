import React, { useContext, useRef, useEffect } from 'react';
import './login.css';
import AuthContext from '../../context/auth/authContext';
import { CircularProgress } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const { login, loading, isAuthenticated } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    login({ email: email.current.value, password: password.current.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social Media</h3>
          <span className='loginDesc'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
            exercitationem.
          </span>
        </div>
        <form className='loginRight' onSubmit={submitHandler}>
          <div className='loginBox'>
            <input
              placeholder='Email'
              required
              type='email'
              className='loginInput'
              ref={email}
            />
            <input
              placeholder='Password'
              type='password'
              required
              minLength='8'
              className='loginInput'
              ref={password}
            />
            <button className='loginButton' type='submit' disabled={loading}>
              {loading ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                'Log In'
              )}
            </button>
            <span className='loginForgot'>Forgot Password?</span>
            <Link
              to='/register'
              className='loginRegisterButton'
              style={{ textDecoration: 'none' }}
            >
              <span className='loginRegisterButton' disabled={loading}>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : (
                  'Create a New Account'
                )}
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
