import React from 'react';

class NowTypingDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyTyping: []
    };
  }

  componentDidMount() {
    // on typing listener
    this.props.socket.on('now typing', (user) => {
      // console.log(username);
      let { currentlyTyping } = this.state;
      let { username }  = user;
      if (!currentlyTyping.includes(username) && username !== this.props.username) {
        currentlyTyping.unshift(username);
        this.setState({ currentlyTyping });
      }
    });

    // stopped typing listener
    this.props.socket.on('stopped typing', (user) => {
      // console.log(username);
      let { currentlyTyping } = this.state;
      let { username } = user;
      // console.log(username, 'stopped typing');
      let removalIndex = currentlyTyping.indexOf(username);
      if (removalIndex >= 0)  {
        currentlyTyping.splice(removalIndex,1);
        this.setState({ currentlyTyping });
      }
    });
  }

  generateNowTypingString() {
    const { currentlyTyping } = this.state;
    const currentUser = currentlyTyping.indexOf(this.props.username);
    if (currentlyTyping.length === 0) {
      return '\n';
    }
    let nowTypingString = '';
    if (currentlyTyping.length > 1) {
      nowTypingString += currentlyTyping[0] + ' and ' + (currentlyTyping.length - 1) + ' others are';
    }
    else {
      nowTypingString += currentlyTyping[0] + ' is';
    }
    nowTypingString += ' currently typing...';
    return nowTypingString;
  }

  render() {
    return (
      <div className='nowTyping'>
        {this.generateNowTypingString()}
      </div>
    );
  }
}

export default NowTypingDisplay;
