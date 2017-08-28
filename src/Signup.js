import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleUsername(e){
    this.setState({ username: e.target.value});
  }
  handlePassword(e){
    this.setState({ password: e.target.value});
  }
  handleEmail(e){
    this.setState({ email: e.target.value});
  }
  handleSignUp(e){
    e.preventDefault();
    let name = this.state.username.trim();
    let password = this.state.password.trim();
    let email = this.state.email.trim();
    this.props.handleSignUp({ name: name, password: password, email: email});
    this.setState({
      username: '',
      password: '',
      email: ''
    })
  }
  render() {
    return (
      <form style={style.loginForm} onSubmit={this.handleSignUp}>
        <TextField
          style={style.formElement}
          type='email'
          value={this.state.email}
          onChange={this.handleEmail}
          floatingLabelText='Email'/>
        <TextField
          style={style.formElement}
          type='text'
          value={this.state.username}
          onChange={this.handleUsername}
          floatingLabelText='Username'/>
        <TextField
          style={style.formElement}
          type='password'
          value={this.state.password}
          onChange={this.handlePassword}
          floatingLabelText='Password'/>
        <RaisedButton
          style={style.formElement}
          label='SIGN UP'
          primary={true}
          type='submit'/>
      </form>
    );
  }
}

export default Login;
