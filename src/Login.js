import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleUsername(e){
    this.setState({ username: e.target.value});
  }
  handlePassword(e){
    this.setState({ password: e.target.value});
  }
  handleLogin(e){
    e.preventDefault();
    let name = this.state.username.trim();
    let password = this.state.password.trim();
    this.props.handleLogin({ name: name, password: password});
    this.setState({
      username: '',
      password: ''
    })
  }
  render() {
    return (
      <form style={style.loginForm} onSubmit={this.handleLogin}>
        <TextField
          style={style.formElement}
          type='text'
          errorText={this.props.nameError}
          value={this.state.username}
          onChange={this.handleUsername}
          floatingLabelText='Username'/>
        <TextField
          style={style.formElement}
          type='password'
          errorText={this.props.passError}
          value={this.state.password}
          onChange={this.handlePassword}
          floatingLabelText='Password'/>
        <RaisedButton
          style={style.formElement}
          label='LOGIN'
          primary={true}
          type='submit'/>
      </form>
    );
  }
}

export default Login;
