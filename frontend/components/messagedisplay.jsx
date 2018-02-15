import React from 'react';
import moment from 'moment';
import shortid from 'shortid';

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
            <div>
              <li key={shortid()}>
                {message.username}
              </li>
              <li key={shortid()}>
                {message.message}
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default MessageDisplay;
