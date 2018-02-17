import React from 'react';
import io from 'socket.io-client';
import Draggable from 'react-draggable';


import ChatWindow from './chatwindow';

// needed for two distinct socket instances
const socketArray = [];

class Root extends React.Component {
  constructor(props) {
    super(props);
    let socketArray = [];
    for (let i = 0; i < 2; i++) {
      socketArray.push(io());
    }
    console.log(socketArray);
    this.state={ socketArray };
    this.renderChatInstance = this.renderChatInstance.bind(this);
  }

  renderChatInstance(socket) {
    return (
      <Draggable handle="strong">
        <div className="box no-cursor">
          <strong className="cursor">
            <div className='topBar' />
          </strong>
          <ChatWindow socket={socket} />
        </div>
      </Draggable>
    );
  }
  
  render() {
    let { socketArray } = this.state;
    return (
      <div className='mainChats'>
        {socketArray.map((socket) => this.renderChatInstance(socket))}
        {/* <Draggable handle="strong">
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
        </Draggable> */}

      </div>
    );
  }
}

export default Root;
