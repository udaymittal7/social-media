import React, { useContext, useEffect } from 'react';
import './navbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const { user, logout, getUser } = useContext(AuthContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    user && getUser(user.username);
  }, [user]);

  const link = user ? `/users/${user.username}` : '/';

  return (
    <div className='navbarContainer'>
      <div className='navbarLeft'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Social Media</span>
        </Link>
      </div>
      <div className='navbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input
            placeholder='Search for friends, posts or videos'
            className='searchInput'
          />
        </div>
      </div>
      <div className='navbarRight'>
        <div className='navbarLinks'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <span className='navbarLink'>Timeline</span>
          </Link>
          <Link to={link} style={{ textDecoration: 'none', color: 'white' }}>
            <span className='navbarLink'>Profile</span>
          </Link>
        </div>
        <div className='navbarIcons'>
          <div className='navbarIconItem'>
            <Person />
            <span className='navbarItemBadge'>1</span>
          </div>
          <div className='navbarIconItem'>
            <Link to='/chat' style={{ textDecoration: 'none', color: 'white' }}>
              <Chat />
            </Link>
            <span className='navbarItemBadge'>2</span>
          </div>
          <div className='navbarIconItem'>
            <Notifications />
            <span className='navbarItemBadge'>1</span>
          </div>
        </div>
        <Link to={link}>
          <img
            src={
              user && user.profilePicture
                ? pf + user.profilePicture
                : pf + 'person/noAvatar.png'
            }
            alt=''
            className='navbarImage'
          />
        </Link>
        <div className='navbarLogout'>
          <button className='navbarLogoutButton' onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
