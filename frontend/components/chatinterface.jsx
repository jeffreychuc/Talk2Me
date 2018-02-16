import React from 'react';

import MessageDisplay from './messagedisplay';
import MessageInput from './messageinput';
import NowTypingDisplay from './nowtypingdisplay';

class ChatInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('rendering chatInterface');
    const { username, avatars } = this.props;
    return (
      <div className='chatInterface'>
        <MessageDisplay username={username} avatars={avatars} socket={this.props.socket} />
        <NowTypingDisplay username={username} socket={this.props.socket} />
        <MessageInput username={username} socket={this.props.socket} />
        <div>
          Logged in as {username}
        </div>
      </div>
    );
  }
}

export default ChatInterface;
