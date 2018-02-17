import React from 'react';
import io from 'socket.io-client';
import shortid from 'shortid';
import Draggable from 'react-draggable';

import ChatWindow from './chatwindow';

class Root extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderChatInstance = this.renderChatInstance.bind(this);
    this.removeChatInstance = this.removeChatInstance.bind(this);
    this.addChatInstance = this.addChatInstance.bind(this);
    this.setZIndex = this.setZIndex.bind(this);
    this.windowRefs = {};
    // let socketArray = [];
    let socketHash = {};
    for (let i = 0; i < 2; i++) {
      // socketArray.push(this.renderChatInstance(io(), i));
      let socket = io();
      // console.log(socket);
      // debugger;
      let id = shortid();
      socketHash[id] = this.renderChatInstance(socket, id);
    }
    // console.log(socketArray);
    this.state = { socketHash };
  }

  removeChatInstance(socket, i) {
    let { socketHash } = this.state;
    delete socketHash[i];
    socket.disconnect();
    this.setState({ socketHash });
  }

  addChatInstance(classAddon='') {
    // let { socketArray } = this.state;
    // socketArray.push(this.renderChatInstance(io(), socketArray.length));
    // this.setState({ socketArray });
    let { socketHash } = this.state;
    let socket = io();
    let id = shortid();
    socketHash[id] = this.renderChatInstance(socket, id, classAddon);
    this.setState({ socketHash })
  }

  setZIndex(i) {
    // console.log(this.windowRefs);
    Object.keys(this.windowRefs).forEach((refKey) => {
      if (this.windowRefs[refKey]) {
        if (refKey === i) {
            this.windowRefs[refKey].className = this.windowRefs[refKey].className + ' active';
        }
        else {
          this.windowRefs[refKey].className = this.windowRefs[refKey].className.replace('active', '');
        }
      }
    })
  }

  renderChatInstance(socket, id, classAddon) {
    let className = "box no-cursor " + classAddon;
    return (
      <Draggable key={shortid()} handle="strong" >
        <div className={className} onClick={() => this.setZIndex(id)} ref={(el) => { this.windowRefs[id] = el; }} >
          <strong className="cursor">
            <div className='topBar' >
              <button onClick={(e) => { e.preventDefault(); this.removeChatInstance(socket, id) }}>
                <i className="fas fa-times" />
              </button>
            </div>
          </strong>
          <ChatWindow socket={socket} />
        </div>
      </Draggable>
    );
  }
  
  render() {
    let { socketHash } = this.state;
    return (
      <div>
        <div className='addChatWindowButton'>
          <button onClick={() => this.addChatInstance('new')}> add chat window </button>
        </div>
        <div className='mainChats'>
          {Object.keys(socketHash).map((key) => socketHash[key])}
        </div>
      </div>
    );
  }
}

export default Root;
