import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import AuthContext from '../../context/auth/authContext';

const Test = (props) => {
  const { loadUser, getUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // getUser(username);
  }, []);
  return <div>Hello</div>;
};

export default Test;
