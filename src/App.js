import React from 'react';
import CommentBox from './CommentBox';
import style from './style';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import axios from 'axios';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';


const axInstance = axios.create({
  baseURL : 'http://localhost:3001/user/'
})

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: '',
      name: '',
      nameError: '',
      passError: '',
      isLogin: true,
      userID: '',
      snackbar: false,
      snackMsg: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleLogin(user){
    axInstance.post('authenticate', user)
    .then(res => {
      console.log(res.data);
      console.log(user.name);
      console.log(user.password);
      console.log(res.data.token);
      if(res.data.success){
        this.setState({token: res.data.token, name: user.name, userID: res.data.id, snackMsg:'Berhasil Login'});
        this.setState({snackbar: true});
      }else{
        this.setState({snackMsg: 'Gagal login'});
        this.setState({snackbar: true});
        console.log(res.data.message);
        if(!res.data.username){
          this.setState({nameError: res.data.message});
        }else if (res.data.password) {
          this.setState({passError: res.data.message});
        }
      }
    })
    .catch(err =>{
      console.log(err);
    });
  }

  login(){
    this.setState({isLogin: false});
  }

  signup(){
    this.setState({isLogin: true});
  }

  handleSignOut(){
    this.setState({token : '', passError: '', nameError: ''});
  }

  handleRequestClose = () => {
    this.setState({
      snackbar: false,
    });
  };

  handleSignUp(user){
    axInstance.post('signup',user)
    .then(res=>{
      if(res.data.success){
        this.handleLogin(user);
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }
  render(){
    let menu = null;
    let menu1st = null;
    let menu2nd = null;
    if(this.state.token){
      menu = <MenuItem primaryText="Sign out" onClick={this.handleSignOut}/>
    }else{
      menu1st = <MenuItem primaryText="Sign Up" onClick={this.signup}/>
      menu2nd = <MenuItem primaryText="Log In" onClick={this.login}/>
    }
    return (
      <div>
        <AppBar
          style={style.appBar}
          title='TEST MERN'
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              {menu}
              {menu1st}
              {menu2nd}
            </IconMenu>
          }/>
        {(this.state.token) ? <CommentBox token={this.state.token} logName={this.state.name} userLogin={this.state.userID} pollInterval={2000}/>
        :
        <Login handleLogin={this.handleLogin} handleSignUp={this.handleSignUp} nameError={this.state.nameError} passError={this.state.passError}/> }
          <Snackbar
          open={this.state.snackbar}
          message={this.state.snackMsg}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default App;
