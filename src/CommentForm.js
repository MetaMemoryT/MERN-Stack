import React, { Component } from 'react';
import style from './style';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '' };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let author = this.props.name.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: this.props.name, text: text, time: Date.now(), userID: this.props.userLogin});
    this.setState({text: '' });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <TextField
          style={style.commentFormText}
          type='text'
          floatingLabelText='Your Text'
          value={this.state.text}
          onChange={this.handleTextChange}/>
        <RaisedButton
          style={style.formElement}
          label='POST'
          primary={true}
          type='submit'/>
      </form>
    )
  }
}

export default CommentForm;
