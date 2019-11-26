import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import setDateFormat from "../../utils/setDateFormat";

const PostItem = ({
  post: { _id, postName, userName, date, image_url },
  match
}) => {
  return (
    <Fragment>
      <div className="individual-post">
        <div className="container">
          <div className="card shadow-sm">
            <div className="row">
              <div className="col-sm-4">
                <img src={image_url} className="img-fluid" alt="" />
              </div>
              <div className="col-sm-6">
                <div className="card-block px-2 py-3">
                  <h4 className="card-title">{postName}</h4>
                  <p className="card-text pt-2">
                    <span className="h6 pr-3">Post by:</span>
                    <span>{userName}</span>
                  </p>
                  <p className="card-text pt-2">
                    <span className="h6 pr-3">Post on:</span>
                    <span>{setDateFormat(date)}</span>
                  </p>
                </div>
                <Link
                  to={`${match.url}/${_id}`}
                  className="btn btn-sm background_color text-white float-right mb-2"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(PostItem);
