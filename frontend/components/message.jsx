import React from 'react';
import moment from 'moment';

class MessageDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.message);
    const { username, message, timestamp } = this.props.message;
    return (this.props.username === username) ? 
      (
        <li>
          {username + ': ' + message}
        </li>
      )
      : 
      (
        <li>
          {message + ' :' + username}
        </li>
      );
  }
}

export default MessageDisplay;
