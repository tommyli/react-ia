import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

const node = document.getElementById('root');

class Post extends Component {
  render() {
    return React.createElement(
      "div",
      {
        className: "post"
      },
      React.createElement(
        "h2",
        {
          className: "postAuthor",
          id: this.props.id
        },
        this.props.user,
        React.createElement(
          "span",
          {
            className: "postBody"
          },
          this.props.content
        ),
        this.props.children
      )
    );
  }
}

Post.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

class Comment extends Component {
  render() {
    return React.createElement(
      "div",
      {
        className: "comment"
      },
      React.createElement(
        "h2",
        {
          className: "commentAuthor"
        },
        this.props.user,
        React.createElement(
          "span",
          {
            className: "commentContent"
          },
          this.props.content
        )
      )
    );
  }
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
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

  handleUserChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      user: val
    }));
  }

  handleTextChange(event) {
    const val = event.target.value;
    this.setState({
      content: val
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(() => ({
      user: "",
      content: ""
    }));
  }

  render() {
    return React.createElement(
      "form",
      {
        className: "createComment",
        onSubmit: this.handleSubmit
      },
      React.createElement(
        "input",
        {
          type: "text",
          placeholder: "Your name",
          value: this.state.user,
          onChange: this.handleUserChange
        }
      ),
      React.createElement(
        "input",
        {
          type: "text",
          placeholder: "Thoughts?",
          value: this.state.content,
          onChange: this.handleTextChange
        }
      ),
      React.createElement(
        "input",
        {
          type: "submit",
          value: "Post"
        }
      )
    );
  }
}

CreateComment.propTypes = {
  content: PropTypes.string
}

const App = React.createElement(
  Post,
  {
    id: 1,
    content: " said: This is a post!",
    user: "Tommy"
  },
  React.createElement(
    Comment,
    {
      id: 2,
      user: "Bob",
      content: " commented: This is a comment!"
    }
  ),
  React.createElement(
    CreateComment
  )
);

render(App, node);
