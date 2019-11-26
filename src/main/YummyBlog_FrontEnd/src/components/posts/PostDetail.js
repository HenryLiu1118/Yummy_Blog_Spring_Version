import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getPost, addLike, removeLike, deletePost } from "../../actions/post";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import setDateFormat from "../../utils/setDateFormat";

const PostDetail = ({
  getPost,
  addLike,
  removeLike,
  deletePost,
  post: { post, loading },
  auth,
  match,
  history
}) => {
  const [displayCommentForm, toggleCommentForm] = useState(false);

  useEffect(() => {
    getPost(match.params.PostId);
  }, [getPost, match.params.PostId]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="post-detail">
        <div className="container">
          <div className="card shadow-sm postdetailcard">
            <img className="card-img-top " src={post.image_url} alt="Yelp" />
            <div className="card-body">
              <h4 className="card-title">{post.postName}</h4>
              <h5 className="card-subtitle mt-1 small">
                <span className="text-muted">Post by: </span>
                <span>
                  <Link to={`/profile/${post.user.toString()}`}>
                    {post.userName}
                  </Link>
                </span>
              </h5>
              <hr />
              <div className="card-body">
                <p className="card-text text-align-center text-secondary">
                  {post.text}
                </p>
                <div className="card-text">
                  {auth.user && !auth.loading && post.user === auth.user._id && (
                    <button
                      className="btn btn-danger btn-sm px-2"
                      onClick={() => {
                        deletePost(post._id, history);
                      }}
                    >
                      Delete Post
                    </button>
                  )}
                  <div>
                    <span className="h6 pr-1 text-muted">Rating:</span>
                    <span className="pl-3">{post.rating}</span>
                  </div>
                  <div>
                    <span className="h6 pr-1 text-muted">Location:</span>
                    <span>{post.location}</span>
                  </div>
                  <div>
                    <span className="h6 pr-1 text-muted">Phone:</span>
                    <span className="pl-3">{post.phone}</span>
                  </div>
                  <div>
                    <span className="h6 pr-1 text-muted">Post on:</span>
                    <span className="pl-2">{setDateFormat(post.date)}</span>
                  </div>
                </div>
                <div className="float-right">
                  {auth.isAuthenticated && post && (
                    <Fragment>
                      <button
                        className="btn btn-danger btn-sm px-3"
                        onClick={() => addLike(post._id)}
                      >
                        <i className="fa fa-heart" aria-hidden="true" />
                        <span>
                          {post && post.likes.length > 0 && (
                            <span>{post.likes.length}</span>
                          )}
                        </span>
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-3"
                        onClick={() => removeLike(post._id)}
                      >
                        <i className="fa fa-heart-o" aria-hidden="true" />
                      </button>
                    </Fragment>
                  )}

                  <button
                    className="btn btn-secondary btn-sm px-2"
                    onClick={() => toggleCommentForm(!displayCommentForm)}
                  >
                    Comment{" "}
                    <span>
                      {post.comments.length > 0 && post.comments.length}
                    </span>
                  </button>
                </div>
              </div>
              {auth.isAuthenticated && <CommentForm postId={post._id} />}
              <hr />
              {auth.isAuthenticated &&
                displayCommentForm &&
                post.comments.length > 0 && (
                  <div className="card-body">
                    {post.comments.map((commentItem, index) => (
                      <CommentItem
                        key={index}
                        comment={
                          {
                            ...commentItem,
                            _id: index
                          }
                        }
                        post={post}
                      />
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateProps,
  { getPost, addLike, removeLike, deletePost }
)(PostDetail);
