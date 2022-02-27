import React from "react";
import Header from "../Navbar/Header";
import { connect } from "react-redux";
import { trackPromise } from "react-promise-tracker";
import { compose } from "redux";
import { withRouter } from "react-router";

import { updateUser, fetchUser } from "../../actions/userActions";

class userInfo extends React.Component {
  state = {
    name: "",
    email: "",
    role: "",
    image: "",
    coverImage: "",
    about: "",
    id: "",
  };

  componentDidMount() {
    // console.log(JSON.parse(localStorage.getItem("profile")).existingUser._id);
    this.setState({
      id: JSON.parse(localStorage.getItem("profile")).existingUser._id,
    });
    trackPromise(
      this.props.fetchUser(
        JSON.parse(localStorage.getItem("profile")).existingUser._id
      )
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      const value = this.props.user.filter((val) => val._id === this.state.id);
      // console.log(value);
      this.setState(value[0]);
    }
  }

  onSubmit(e) {
    // console.log("calling");
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.image[0]);
    data.append("upload_preset", "oxry9nqo");
    data.append("cloud_name", "djsunmihd");
    trackPromise(
      this.props.updateUser(this.state.id, this.state, data, this.props.history)
    );
    // console.log(data);
    // console.log(this.state);
  }

  render() {
    // console.log(this.props.user);
    return (
      <div>
        <Header />

        <div className="container">
          <div className="cover-photo">
            <img
              src="./Images/cover-image.jpg"
              className="img-fluid w-100 cover-image"
            />
          </div>
          <div className="row mt-3 position-relative">
            <div className="col-12 col-md-4 text-center profile-section">
              <img
                src={
                  this.props.user.image === undefined
                    ? "./Images/user.jpg"
                    : this.props.user.image
                }
                className="profile-pic"
              />
              <h5 className=" mt-3 mb-0">
                <b className="text-capitalize">{this.props.user.name}</b>
              </h5>
              <small className="text-capitalize">{this.props.user.role}</small>
              <div className="d-flex justify-content-around">
                <div>
                  <b>123k</b>
                  <br />
                  <small>Followers</small>
                </div>
                <div>
                  <b>123k</b>
                  <br />
                  <small>Followers</small>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 p-4 about-section">
              <div className="d-flex justify-content-between">
                <h5>
                  <b>About</b>
                </h5>
                <button
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    this.setState({
                      name: this.props.user.name,
                      email: this.props.user.email,
                      role: this.props.user.role,
                      about: this.props.user.about,
                      image: this.props.user.image,
                    });
                  }}
                >
                  <i className="fa-solid fa-pen-to-square text-white"></i>
                </button>
              </div>
              {this.props.user.about}
            </div>
          </div>
        </div>

        {/* <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => {
            this.setState({
              name: this.props.user.name,
              email: this.props.user.email,
              role: this.props.user.role,
              about: this.props.user.about,
              image: this.props.user.image,
            });
          }}
        >
          Launch demo modal
        </button> */}

        {/* modal starts here */}
        <form method="post" onSubmit={this.onSubmit.bind(this)}>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Details
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Job Role</label>
                    <input
                      type="text"
                      name="role"
                      className="form-control"
                      value={this.state.role}
                      onChange={(e) => {
                        this.setState({ role: e.target.value });
                      }}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>About</label>
                    <textarea
                      className="form-control"
                      value={this.state.about}
                      onChange={(e) => {
                        this.setState({ about: e.target.value });
                      }}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Profile Picture</label>
                    <br />
                    <input
                      type="file"
                      id="validatedCustomFile"
                      accept="image/*"
                      onChange={(e) => {
                        this.setState({ image: e.target.files });
                      }}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    value="Save changes"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// export default connect(mapStateToProps, { updateUser, fetchUser })(userInfo);
export default compose(connect(mapStateToProps, { updateUser, fetchUser }))(
  withRouter(userInfo)
);
