import React from 'react';

import MessageDisplay from './messagedisplay';
import MessageInput from './messageinput';

class ChatInterface extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    console.log('rendering chatInterface');
    const { username } = this.props;
    return (
      <div className='chatInterface'>
        <MessageDisplay username={username} socket={this.props.socket} />
        <MessageInput username={username} socket={this.props.socket} />
      </div>
    );
  }
}

export default ChatInterface;
