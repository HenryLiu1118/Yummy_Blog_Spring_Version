import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { SearchYelp, clearYelp, addPost } from "../../actions/post";

const PostForm = ({
  SearchYelp,
  clearYelp,
  addPost,
  post: { yelps, loading },
  history
}) => {
  useEffect(() => {
    clearYelp();
  }, [clearYelp]);

  const [formData, setFormData] = useState({
    location: "",
    limit: "",
    price: "",
    categories: "",
    term: ""
  });

  const { location, limit, price, categories, term } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitYelp = e => {
    e.preventDefault();
    SearchYelp(formData);
    setYelp(null);
  };

  const [yelp, setYelp] = useState(null);

  const onSelect = item => {
    setYelp(item);
  };

  const [text, setText] = useState("");

  const yelpform = (
    <form className="form px-3 py-4" onSubmit={e => onSubmitYelp(e)}>
      <h1 className="font_color">Post New Blog</h1>
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          className="form-control"
          placeholder="location"
          name="location"
          value={location}
          required
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <label>Limit:</label>
        <input
          type="text"
          className="form-control"
          placeholder="limit"
          name="limit"
          value={limit}
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="text"
          className="form-control"
          placeholder="price"
          name="price"
          value={price}
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          className="form-control"
          placeholder="categories"
          name="categories"
          value={categories}
          onChange={e => onChange(e)}
        />
      </div>
      <div className="form-group">
        <label>Term:</label>
        <input
          type="text"
          className="form-control"
          placeholder="term"
          name="term"
          value={term}
          onChange={e => onChange(e)}
        />
      </div>
      <input type="submit" className="btn background_color float-right text-white" value="Search" />
    </form>
  );

  const yelplist = (
    <Fragment>
      {yelps.length > 0 && (
        <div>
          <button onClick={() => clearYelp()} className="btn btn-light">Clear Result</button>
          <hr />
          {yelps.map(item => (
            <fragment>
            <div key={item.id}> 
              <div>
                <div>Name: {item.name}</div>
                <div>Rating: {item.rating}</div>
                <div>Price: {item.price}</div>
                <div>Phone: {item.phone}</div>
                <div>Location: {item.location.address1}</div>
                <img src={item.image_url} className="postImage" alt="Yelp" />
              </div>
              <div className="float-right">
              <button onClick={() => onSelect(item)} className="btn background_color text-white">Select</button>
              </div>
            </div>
            <br/>
            <hr />
            </fragment>
          ))}
        </div>
      )}
    </Fragment>
  );

  const yelpItem = (
    <Fragment>
      {yelp && (
        <div>
          <div>Name: {yelp.name}</div>
          <div>Rating: {yelp.rating}</div>
          <div>Price: {yelp.price}</div>
          <div>Phone: {yelp.phone}</div>
          <img src={yelp.image_url} className="postImage" alt="Yelp" />
        </div>
      )}
    </Fragment>
  );

  const textForm = (
    <form
      className="form"
      onSubmit={e => {
        e.preventDefault();
        const finalForm = {};
        if (text) finalForm.text = text;

        if (yelp) {
          if (yelp.id) finalForm.yelpId = yelp.id;
          if (yelp.name) finalForm.postName = yelp.name;
          if (yelp.image_url) finalForm.image_url = yelp.image_url;
          if (yelp.rating) finalForm.rating = yelp.rating;
          if (yelp.price) finalForm.price = yelp.price;
          if (yelp.phone) finalForm.phone = yelp.phone;
          if (yelp.distance) finalForm.distance = yelp.distance;
          if (yelp.location) finalForm.location = yelp.location.address1;
        }
        addPost(finalForm, history);
        setText("");
      }}
    >
    <div className="form-group">
      <textarea
        className="form-control"
        name="text"
        cols="10"
        rows="5"
        placeholder="Create a post"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <div className="text-center mt-2">
      <input
        type="submit"
        className="btn btn-dark my-2"
        value="Submit You Post"
      />
      </div>
    </div>
    </form>
  );
  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          {yelpform}
          <br></br>
          <hr/>
          <div className="mt-2">{textForm}</div>
        </div>
        <div className="col-xs-12 col-sm-6">
          {loading ? <Spinner /> : <div>{yelp ? yelpItem : yelplist}</div>
          }
        </div>
      </div>
    </Fragment>
  );
};

const mapStateTpProps = state => ({
  post: state.post
});

export default connect(
  mapStateTpProps,
  { SearchYelp, clearYelp, addPost }
)(PostForm);
