import React from 'react';
import moment from 'moment';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.message);
    const { username, message, timestamp } = this.props.message;
    const avatarString = "data:image/png;base64," + this.props.avatar;
    return (this.props.username === username) ? 
      (
        <div className='singleMessage'>
          <img width={50} height={50} src={avatarString} />
          <div className='messageBody'>
            <li className='username'>
              {username}
              <div className='timestamp'>
                {moment(timestamp).format('h:mm a')}
              </div>
            </li>
            <li>
              {message}
            </li>
          </div>
        </div>
      )
      : 
      (
        <div className='singleMessage other'>
          <div className='messageBody'>
            <li className='username'>
              <div className='timestamp'>
                {moment(timestamp).format('h:mm a')}
              </div>
              <div>
                {username}
              </div>
            </li>
            <li>
              {message}
            </li>
          </div>
          <img width={50} height={50} src={avatarString} />
        </div>
      );
  }
}

export default Message;
