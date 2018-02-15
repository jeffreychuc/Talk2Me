import React from 'react';
import moment from 'moment';
import shortid from 'shortid';

import Message from './message';

class MessageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      messages: []
    };
  }

  componentDidMount() {
    this.props.socket.on('chat message', (msg) => {
      let { messages } = this.state;
      messages.push(msg);
      this.setState({ messages });
      console.log('state should be updating');
    })
  }

  componentWillUnmount() {
    this.props.socket.off('chat message');
  }


  render() {
    const { messages } = this.state;
    console.log('rendering chat messages', messages);
    return (
      <div>
        <ul>
          {messages.map((message) => (
            <Message
              username={this.props.username}
              key={shortid()} 
              message={message}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default MessageDisplay;
