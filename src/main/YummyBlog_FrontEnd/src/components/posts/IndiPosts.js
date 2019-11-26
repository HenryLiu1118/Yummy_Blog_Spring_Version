import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getPostByUserId } from "../../actions/post";
import PostDetail from "./PostDetail";
import PostItem from "./PostItem";
import { Route } from "react-router-dom";

const IndiPosts = ({
  getPostByUserId,
  post: { posts, count, loading },
  match
}) => {
  const [postPage, setPage] = useState(1);
  useEffect(() => {
    getPostByUserId(match.params.id, postPage);
  }, [getPostByUserId, match.params.id, postPage]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div>
        <div className="my-2">
        <h2 className="font_color text-center">Welcome to My Posts</h2>
        <p className="text-secondary">{count} Posts</p>
        <p className="text-secondary">Page: {postPage}</p>
        {postPage > 1 && (
                <button
                  className="page"
                  onClick={() => {
                    setPage(postPage - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {postPage * 5 <= count && (
                <button
                  className="page ml-2"
                  onClick={() => {
                    setPage(postPage + 1);
                  }}
                >
                  Next
                </button>
              )}
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <Fragment>
              {posts.length > 0 ? (
                posts.map(post => (
                  <div key={post._id}>
                    <PostItem post={post} />
                    <hr />
                  </div>
                ))
              ) : (
                <h4>No post found...</h4>
              )}
            </Fragment>
          </div>
          <div className="col-xs-12 col-sm-6">
            <Route
              exact
              path={`${match.path}/:PostId`}
              component={PostDetail}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostByUserId }
)(IndiPosts);
