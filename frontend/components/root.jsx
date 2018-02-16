import React from 'react';
import io from 'socket.io-client';
import Draggable from 'react-draggable';


import ChatWindow from './chatwindow';

// needed for two distinct socket instances
const socket0 = io();
const socket1 = io();

class Root extends React.Component {
  render() {
    return (
      <div className='mainChats'>
        <Draggable handle="strong">
          <div className="box no-cursor">
            <strong className="cursor">
              <div className='topBar' />
            </strong>
            <ChatWindow socket={socket0} />
          </div>
        </Draggable>

        <div className='spacer' />

        <Draggable handle="strong">
          <div className="box no-cursor">
            <strong className="cursor">
              <div className='topBar' />
            </strong>
            <ChatWindow socket={socket1} />
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Root;
