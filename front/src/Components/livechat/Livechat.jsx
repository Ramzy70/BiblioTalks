import React, { useState, useRef , useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';

import './livechat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    setMessages([...messages, { text: newMessage, user: 'You' }]);
    setNewMessage('');
  };
  
  const divRef = useRef();
  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);
  

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={divRef}>
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="username" style={{ color: message.user === 'You' ? 'blue' : 'black' }}>
              {message.user}
            </div>
            <div className="text">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ fontFamily: 'Roboto' }}
          />
          <button onClick={sendMessage} style={{ backgroundColor: 'blue', color: 'white' }}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;