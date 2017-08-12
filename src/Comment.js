import React, { Component } from 'react';
import style from './style';
import marked from 'marked';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/FlatButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      author: '',
      text: '',
      ellapsed : '',
      dialogOpen: false,
      ownIt: false
    };

    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.getTime = this.getTime.bind(this);
  }
  updateComment(e) {
    e.preventDefault();
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleCommentUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let author = this.props.author;
    let text = (this.state.text) ? this.state.text : null;
    let comment = { author: author, text: text};
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    })
  }
  handleDialogOpen(e){
    e.preventDefault();
    this.setState({dialogOpen: true});
  }

  handleDialogClose(e){
    e.preventDefault();
    this.setState({dialogOpen:false});
  }
  deleteComment(e) {
    e.preventDefault();
    this.setState({dialogOpen:false});
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('oops deleted');
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  getTime(){
    let millis = Date.now() - this.props.time;
    const ms = millis % 1000;
    millis = (millis - ms) / 1000;
    const secs = millis % 60;
    millis = (millis - secs) / 60;
    const mins = millis % 60;
    millis = (millis - mins) / 60;
    const hrs = millis % 24;
    const days = (millis - hrs) / 24;
    var timeSinceCreation = [days, hrs, mins, secs, ms];

    let timeText = 'Now';
    if (timeSinceCreation[0] !== 0) {
      if(timeSinceCreation[0] == 1){
        timeText = timeSinceCreation[0] + ' day ago';
      }else if(timeSinceCreation[0] > 1){
        timeText = timeSinceCreation[0] + ' days ago';
      }
    } else if (timeSinceCreation[1] !== 0) {
      if(timeSinceCreation[1] == 1){
        timeText = timeSinceCreation[1] + ' hour ago';
      }else if(timeSinceCreation[1] > 1){
        timeText = timeSinceCreation[1] + ' hours ago';
      }
    } else if (timeSinceCreation[2] !== 0) {
      if(timeSinceCreation[2] == 1){
        timeText = timeSinceCreation[2] + ' minute ago';
      }else if(timeSinceCreation[2] > 1){
        timeText = timeSinceCreation[2] + ' minutes ago';
      }
    } else if (timeSinceCreation[3] !== 0) {
      if(timeSinceCreation[3] == 1){
        timeText = timeSinceCreation[3] + ' second ago';
      }else if(timeSinceCreation[3] > 1){
        timeText = timeSinceCreation[3] + ' seconds ago';
      }
    }
    this.setState({ellapsed : timeText});
  }
  componentWillMount(){
    (this.props.userID == this.props.userLogin) ? this.setState({ownIt: true}) : this.setState({ownIt: false});
  }
  componentDidMount(){
    this.getTime();
    this.interval = setInterval(this.getTime,5000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const actions= [
      <FlatButton
        label="Batal"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Yakin"
        primary={true}
        onTouchTap={this.deleteComment}
      />,
  ];
    const commentAction = <div>
      <CardActions>
        <RaisedButton primary={true} label='update' onTouchTap={this.updateComment}/>
        <RaisedButton secondary={true} label='delete' onTouchTap={this.handleDialogOpen}/>
      </CardActions>
      <Dialog
      actions={actions}
      modal={false}
      open={this.state.dialogOpen}
      onRequestClose={this.handleDialogClose}>
      yakin hapus komen ini?
    </Dialog>
      { (this.state.toBeUpdated)
        ? (<form onSubmit={ this.handleCommentUpdate }>
            <TextField
              style={style.formElement}
              type='text'
              floatingLabelText='Update your Text'
              value={this.state.text}
              onChange={this.handleTextChange}/>
            <RaisedButton
              style={style.formElement}
              label='Update'
              primary={true}
              type='submit'/>
          </form>)
        : null}
    </div>
    return (
        <Card style={style.commentNew}>
          <CardTitle
            title={this.props.author}
            subtitle={this.state.ellapsed}/>
          <CardText dangerouslySetInnerHTML={ this.rawMarkup()}/>
          {(this.state.ownIt) ? commentAction : null}
        </Card>
    )
  }
}

export default Comment;
