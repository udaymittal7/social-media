import React from 'react';
import './message.css';

const Message = ({ own }) => {
  return (
    <div className={`message ${own && 'own'}`}>
      <div className='messageTop'>
        <img src='' className='messageImage' />
        <p className='messageText'>This is a Message</p>
      </div>
      <div className='messageBottom'>1 hour ago</div>
    </div>
  );
};

export default Message;
