import React from 'react';
import io from 'socket.io-client';

import ChatWindow from './chatwindow';

// needed for two distinct socket instances
const socket0 = io();
const socket1 = io();

class Root extends React.Component {
  render() {
    return (
      <div className='mainChats'>
        <ChatWindow socket={socket0}/>
        <ChatWindow socket={socket1}/>
      </div>
    );
  }
}

export default Root;
