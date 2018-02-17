import React from 'react';

import MessageDisplay from './messagedisplay';
import MessageInput from './messageinput';
import NowTypingDisplay from './nowtypingdisplay';

class ChatInterface extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('rendering chatInterface');
    const { username, avatars, clients } = this.props;
    return (
      <div className='chatInterface'>
        <MessageDisplay username={username} avatars={avatars} socket={this.props.socket} clients={clients} />
        <NowTypingDisplay username={username} socket={this.props.socket} />
        <div>
          <MessageInput username={username} socket={this.props.socket} />
          <div className='loggedInStatus'>
            Logged in as {username}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatInterface;
