import React from 'react';
import moment from 'moment';
import ReactFileReader from 'react-file-reader';


class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      messageImage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleTypeingID = null;
  }

  componentDidMount() {
    this.messageInput.focus();
  }

  handleChange(e) {
    // console.log('handling change on text input area');
    
    clearTimeout(this.handleTypeingID);
    this.props.socket.emit('now typing', {username: this.props.username});
    this.handleTypeingID = setTimeout(() => this.props.socket.emit('stopped typing', {username: this.props.username}), 2000);
    this.setState({ messageText: e.currentTarget.value });
  }


  handleFiles(files) {
    console.log(files.base64);
    // build message response
    const messageText = files.base64;
    const { username } = this.props;
    const messagePayload = {
      image: true,
      message: messageText,
      username: username,
      timestamp: Date.now()
    };
    this.props.socket.emit('chat message', messagePayload);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    clearTimeout(this.handleTypeingID);
    this.props.socket.emit('stopped typing', { username: this.props.username });

    const { messageText } = this.state;
    const { username } = this.props;

    if (messageText.length !== 0) {
      // console.log('should be emitting a message to the server for relay back to all clients');
      const messagePayload = {
        message: messageText,
        username: username,
        timestamp: Date.now()
      };
      this.props.socket.emit('chat message', messagePayload);
      this.setState({ messageText: '' });
    }
  }

  render() {
    return (
      <div className='messageInput'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.messageText}
            onChange={this.handleChange}
            ref={(input) => { this.messageInput = input; }} 
          />
          <ReactFileReader base64={true} handleFiles={this.handleFiles}>
            <button className='btn'>Upload</button>
          </ReactFileReader>
          <input type="submit" value="send" />
        </form>
      </div>
    );
  }
}

export default MessageInput;
