import React from 'react';
import ReactDOM from 'react-dom';
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
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  componentDidMount() {
    this.props.socket.on('chat message', (msg) => {
      let { messages } = this.state;
      messages.push(msg);
      this.setState({ messages });
      console.log('state should be updating');
    })
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.socket.off('chat message');
  }


  render() {
    const { messages } = this.state;
    console.log('rendering chat messages', messages);
    return (
      <div className='messageDisplay' ref={(el) => this.messagesContainer = el} >
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