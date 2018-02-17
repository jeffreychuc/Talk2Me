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
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.socket.off('chat message');
  }

  welcomeMessage() {
    let peopleOnline = Object.keys(this.props.avatars).length;
    let peoplePlural = ['are', 'people'];
    if (peopleOnline === 1) {
      peoplePlural = ['is', 'person'];
    }
    return (
            <li className='welcomeText'>
              Welcome to Talk2Me, there {peoplePlural[0]} currently {peopleOnline} {peoplePlural[1]} online
            </li>
            );
  }
  render() {
    const { messages } = this.state;
    // console.log('rendering chat messages', messages);
    // console.log('LKDJLASKJDLSKJDLKSJALKDJLSAKJDLAKSJLK');
    
    console.log(Object.keys(this.props.avatars), 'avatarsss');
    return (
      <div className='messageDisplay' ref={(el) => this.messagesContainer = el} >
        <ul>
          {this.welcomeMessage()}
          {messages.map((message) => (
            <Message
              username={this.props.username}
              avatar={this.props.avatars[message.username]}
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
