import { CircularProgress } from '@material-ui/core';
import React, { useContext, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import './register.css';

const Register = (props) => {
  const { register, loading, isAuthenticated } = useContext(AuthContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      passwordConfirm.current.setCustomValidity('Passwords do not match');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      register(user);
    }
  };

  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <h3 className='registerLogo'>Social Media</h3>
          <span className='registerDesc'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum,
            exercitationem.
          </span>
        </div>
        <div className='registerRight'>
          <form className='registerBox' onSubmit={submitHandler}>
            <input
              placeholder='Username'
              ref={username}
              required
              className='registerInput'
            />
            <input
              placeholder='Email'
              ref={email}
              required
              type='email'
              className='registerInput'
            />
            <input
              placeholder='Password'
              type='password'
              ref={password}
              required
              minLength='8'
              className='registerInput'
            />
            <input
              placeholder='Confirm Password'
              type='password'
              ref={passwordConfirm}
              required
              minLength='8'
              className='registerInput'
            />
            <button className='registerButton' type='submit' disabled={loading}>
              {loading ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                'Sign Up'
              )}
            </button>
            <Link
              to='/login'
              className='registerRegisterButton'
              style={{ textDecoration: 'none' }}
            >
              <span className='registerRegisterButton' disabled={loading}>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : (
                  'Log into your account'
                )}
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
