import React, { useContext, useEffect } from 'react';
import './chat.css';
import Navbar from '../../components/navbar/Navbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';

const Chat = () => {
  return (
    <>
      <Navbar />
      <div classname='chat'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search for friends' className='chatMenuInput' />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className='chatBoxBottom'>
              <textarea
                className='chatMessageInput'
                placeholder='Write something..'
              ></textarea>
              <button className='chatSubmitButton'>Send</button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'></div>
        </div>
      </div>
    </>
  );
};

export default Chat;
