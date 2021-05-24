import React, { useContext, useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import AuthContext from './context/auth/authContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Chat from './pages/chat/Chat';

const App = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser();
    //eslint-disable-next-line
  }, [localStorage.token]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/users/:username' component={Profile} />
        <PrivateRoute exact path='/chat' component={Chat} />
      </Switch>
    </Router>
  );
};

export default App;
