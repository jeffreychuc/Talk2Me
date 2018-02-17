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
      if ((messages.length > 0) && (msg.username === messages[messages.length - 1].username))  {
        msg = {
          continues: true,
          message: msg.message,
          username: msg.username
        }
      }
      messages.push(msg);
      this.setState({ messages });
      // console.log('state should be updating');
    });

    this.props.socket.on('client disconnected', (username) => {
      let { messages } = this.state;
      let message = {
        notification: true,
        username: username
      };
      messages.push(message);
      this.setState({messages});
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.socket.off('chat message');
  }

  welcomeMessage() {
    let peopleOnline = this.props.clients;
    let peoplePlural = ['are', 'people'];
    if (peopleOnline === 1) {
      peoplePlural = ['is', 'person'];
    }
    return (
      <li className='welcomeText'>
        Welcome to Talk2Me, there {peoplePlural[0]} currently {peopleOnline} {peoplePlural[1]} online.
      </li>
    );
  }
  render() {
    const { messages } = this.state;
    // console.log('rendering chat messages', messages);
    // console.log('LKDJLASKJDLSKJDLKSJALKDJLSAKJDLAKSJLK');
    
    // console.log(Object.keys(this.props.avatars), 'avatarsss');
    return (
      <div className='messageDisplay' ref={(el) => this.messagesContainer = el} >
        <ul>
          {this.welcomeMessage()}
          {messages.map((message) => {
            if (message.notification) {
              if (message.username) {
                return (
                          <li key={shortid()} className='disconnectMessage'>
                            {message.username} has disconnected
                          </li>
                        )
              }
              return null;
            }
            if (message.continues) {
              return (
                      <li 
                        key={shortid()} 
                  className={this.props.username === message.username ? 'singleMessage contMessage' : 'singleMessage contMessage other'}>
                        {message.message}
                      </li>
                      );
            }
            return (
              <Message
                username={this.props.username}
                avatar={this.props.avatars[message.username]}
                key={shortid()} 
                message={message}
              />
            )
          })}
        </ul>
      </div>
    );
  }
}

export default MessageDisplay;
