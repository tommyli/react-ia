import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

const node = document.getElementById('root');

const data = {
  post: {
    id: 123,
    content:
      "What we hope ever to do with ease, we must first learn to do with diligence. — Samuel Johnson",
    user: "Mark Thomas"
  },
  comments: [
    {
      id: 0,
      user: "David",
      content: "such. win."
    },
    {
      id: 1,
      user: "Haley",
      content: "Love it."
    },
    {
      id: 2,
      user: "Peter",
      content: "Who was Samuel Johnson?"
    },
    {
      id: 3,
      user: "Mitchell",
      content: "@Peter get off Letters and do your homework"
    },
    {
      id: 4,
      user: "Peter",
      content: "@mitchell ok :P"
    }
  ]
};

class Post extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  static defaultProps = {
    user: "",
    content: "",
    id: -1
  }

  render() {
    return (
      <div className="post">
        <h2 className="postAuthor">{this.props.user}</h2>
        <span className="postBody">{this.props.content}</span>
        {this.props.children}
      </div>
    );
  }
}

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  }

  static defaultProps = {
    id: -1,
    content: "",
    user: ""
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.user + " : "}</h2>
        <span className="commentContent">{this.props.content}</span>
      </div>
    );
  }
}

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      user: ""
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    onCommentSubmit: PropTypes.func.isRequired,
    content: PropTypes.string
  }

  static defaultProps = {
    onCommentSubmit: function (comment) {
    },
    content: ""
  };

  handleUserChange(event) {
    const val = event.target.value;
    this.setState((prevState, props) => ({
      user: val
    }));
  }

  handleTextChange(event) {
    const val = event.target.value;
    this.setState((prevState, props) => ({
        content: val
      })
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onCommentSubmit({
      user: this.state.user.trim(),
      content: this.state.content.trim()
    });

    this.setState((prevState, props) => ({
      user: "",
      content: ""
    }));
  }

  render() {
    return (
      <form className="createComment" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.user} onChange={this.handleUserChange}/>
        <input type="text" placeholder="Thoughts?" value={this.state.content} onChange={this.handleTextChange}/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  static propTypes = {
    post: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object)
  };

  handleCommentSubmit(comment) {
    this.setState((prevState) => {
      const comments = prevState.comments;
      comment.id = Date.now();
      const newComments = comments.concat([comment]);

      return {
        comments: newComments
      }
    })
  }

  render() {
    return (
      <div className="commentBox">
        <Post id={this.props.id} content={this.props.post.content} user={this.props.post.user}>
          {
            this.state.comments.map(function (comment) {
              return (
                <Comment key={comment.id} id={comment.id} content={comment.content} user={comment.user}/>
              );
            })
          }
          <CreateComment onCommentSubmit={this.handleCommentSubmit}/>
        </Post>
      </div>
    );
  }
}

render(
  <CommentBox comments={data.comments} post={data.post}/>,
  node
);
