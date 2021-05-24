import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from './context/auth/AuthState';
import PostState from './context/post/PostState';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <PostState>
        <App />
      </PostState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
