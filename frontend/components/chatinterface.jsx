import React from 'react';

class ChatInterface extends React.Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    console.log('rendering chatInterface');
    const { username } = this.props;
    return (
      <div className='chatInterface'>
        {username}
      </div>
    );
  }
}

export default ChatInterface;
