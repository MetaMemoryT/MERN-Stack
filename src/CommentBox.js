import React, { Component } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from './style';

const axInstance = axios.create({
  baseURL : 'http://localhost:3001/api/'
})


class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }
  loadCommentsFromServer() {
    axInstance.get(`comments?token=${this.props.token}`)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleCommentSubmit(comment) {
    let comments = this.state.data;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    axInstance.post(`comments?token=${this.props.token}`, comment)
      .catch(err => {
        console.error(err);
        this.setState({ data: comments });
      });
  }
  handleCommentDelete(id) {
    axInstance.delete(`comments/${id}?token=${this.props.token}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleCommentUpdate(id, comment) {
    //sends the comment id and new author/text to our api
    axInstance.put(`comments/${id}?token=${this.props.token}`, comment)
      .then(res=>{
        console.log('comment updated');
      })
      .catch(err => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    this.loadInterval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  componentWillUnmount(){
    clearInterval(this.loadInterval);
  }
  render() {
    return (
      <div style={ style.commentBox }>
        <h2 style={ style.title }>Comments:</h2>
        <CommentList
          onCommentDelete={ this.handleCommentDelete }
          onCommentUpdate={ this.handleCommentUpdate }
          userLogin={this.props.userLogin}
          data={ this.state.data }/>
        <CommentForm onCommentSubmit={ this.handleCommentSubmit} name={this.props.logName} userLogin={this.props.userLogin}/>
      </div>
    )
  }
}

export default CommentBox;
