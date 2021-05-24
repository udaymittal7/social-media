import React from 'react';
import './online.css';

const Online = ({ user }) => {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className='rightbarFriend'>
      <div className='rightbarProfileImgContainer'>
        <img
          src={pf + user.profilePicture}
          alt=''
          className='rightbarProfileImg'
        />
        <span className='rightbarOnline'></span>
      </div>
      <span className='rightbarUsername'>{user.username}</span>
    </li>
  );
};

export default Online;
