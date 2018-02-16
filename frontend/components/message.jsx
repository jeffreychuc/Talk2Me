import React from 'react';
import moment from 'moment';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.message);
    const { username, message, timestamp } = this.props.message;
    const avatarString = "data:image/png;base64," + this.props.avatar;
    return (this.props.username === username) ? 
      (
        <div className='singleMessage'>
          <img width={50} height={50} src={avatarString} />
          <li>
            {username + ': ' + message}
          </li>
        </div>
      )
      : 
      (
        <div className='singleMessage other'>
          <li>
            {message + ' :' + username}
          </li>
          <img width={50} height={50} src={avatarString} />
        </div>
      );
  }
}

export default Message;
