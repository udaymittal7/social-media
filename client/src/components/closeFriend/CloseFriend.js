import React from 'react';
import './closeFriend.css';

const CloseFriend = ({ user }) => {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className='sidebarFriends'>
      <img
        src={pf + user.profilePicture}
        alt=''
        className='sidebarFriendImage'
      />
      <span className='sidebarFriendName'>{user.username}</span>
    </li>
  );
};

export default CloseFriend;
