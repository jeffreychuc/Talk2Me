import React from 'react';
import axios from 'axios';
import isEqual from 'lodash/isEqual';


import ChatRegistration from './chatregistration';
import ChatInterface from './chatinterface';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      id: '',
      avatars: {},
      displayErrors: false,
      errors: []
    };
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('updating avatars', (avatars) => {
      if (!isEqual(this.state.avatars, avatars)) {
        console.log('updating avatars');
        this.setState({ avatars });
      }
    });
  }

  registerUser(username) {
    let errors = [];
    // set error state if username is blank
    if (username.length === 0) {
      errors.push('Username Can\'t be blank!');
      this.setState({
        displayErrors: true,
        errors: errors
      });
    }
    // check against server to ensure that username isnt taken
    else {
      // not using socket for this so that i can use the response from the
      // ajax request to set the error state.
      const { id } = this.props.socket;
      axios.post('/login', { username, id }).then((res) => {
        if (res.data.status === 200) {
          console.log('user registered and logged in');
          console.log(res.data);
          this.setState({ username: res.data.username, avatars: res.data.avatars, id: this.props.socket.id, loggedIn: true });
          // console.log('state should have been set');
        }
        else {
          errors.push('Username is already taken! Pick another one.');
          this.setState({
            displayErrors: true,
            errors: errors
          });
        }
      });
    }
  }

  handleChange(e) {
    this.setState({ username: e.currentTarget.value });
  }

  renderChat() {
    const { loggedIn, username, avatars, errors } = this.state;
    console.log(avatars);
    return loggedIn ? (
      <ChatInterface
        username={username}
        socket={this.props.socket}
        avatars={avatars}
      />
    ) : (
      <ChatRegistration
        registerUser={this.registerUser}
        errors={errors}
      />
    );
  }

  render() {
    console.log('rendering chat');
    return (
      <div className='chatContainer'>
        {this.renderChat()}
      </div>
    );
  }
}

export default ChatWindow;
