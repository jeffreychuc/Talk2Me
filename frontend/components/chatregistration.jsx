import React from 'react';
import shortid from 'shortid';

class ChatRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ username: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username } = this.state;
    // console.log('a username was submitted');
    // console.log(username);
    this.props.registerUser(username);
  }

  render() {
    // console.log('rendering chatRegistration');
    let { errors } = this.props;
    // console.log(errors);
    return (
      <div className='registrationSplash'>
        <div className='registrationHeader'>
          <span>welcome to</span><br/>Talk2Me
        </div>
        <div className='usernameInput'>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input 
                type='text'
                value = {this.state.username}
                placeholder='Enter Your Username'
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className='userRegistrationErrors'>
          <ul>
            {errors.map((error) =>
              <li key={shortid()}>
                {error}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatRegistration;
