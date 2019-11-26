import React, { Fragment } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import setDateFormat from "../../utils/setDateFormat";

const CommentItem = ({
  post,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  return (
    <Fragment>
      <div className="container bg-light">
        <div className="d-flex">
          <h6 className="font_color">@ {name}</h6>
          <p className="ml-auto text-secondary">{setDateFormat(date)}</p>
        </div>
        <p className="pl-3">{_id} {text}</p>
        {!auth.loading &&
          (user === auth.user._id ||
            post.user._id === auth.user._id) && (
            <button
              type="button"
              className="btn btn-danger btn-sm px-2"
              onClick={() => deleteComment(post._id, _id)}
            >
              Delete Comment
            </button>
          )}
      </div>
      <hr />
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
