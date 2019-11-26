import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <Fragment>
      <div className="card-body">
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText("");
          }}
        >
          <div className="form-group">
            <textarea
              className="form-control"
              type="message"
              rows="3"
              name="text"
              placeholder="Write a comment..."
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
            <input
              type="submit"
              className="btn background_color text-white btn-sm px-2 mt-1 float-right"
              value="Post"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(
  null,
  { addComment }
)(CommentForm);
