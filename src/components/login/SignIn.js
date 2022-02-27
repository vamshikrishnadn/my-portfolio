import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";
import { reduxForm, Field } from "redux-form";

import { Link } from "react-router-dom";
import $ from "jquery";
import { trackPromise } from "react-promise-tracker";
import { signin } from "../../actions/userActions";

class Signin extends Component {
  state = { email: "" };
  componentDidMount() {
    $(".show").on("click", () => {
      if ($("#txtPassword").prop("type") === "password") {
        $("#txtPassword").attr("type", "text");
        $(".show").addClass("bi-eye-fill-color");
      } else {
        $("#txtPassword").attr("type", "password");
        $(".show").removeClass("bi-eye-fill-color");
      }
    });
  }

  renderInput({ input, type, label, meta, placeholder, id, readonly }) {
    return (
      <div className="form-group row">
        <div className="col-12">
          <div className="form-label">
            <label>{label}</label>
          </div>
          <input
            {...input}
            type={type}
            autoComplete="off"
            className="form-control form-input"
            placeholder={placeholder}
            id={id}
            readonly={readonly}
          />
          <div>
            {meta.touched && meta.error ? (
              <div className="alert alert-danger p-1 my-1">{meta.error}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }

  onSubmit = (formValues) => {
    // console.log(formValues);
    trackPromise(this.props.signin(formValues, this.props.history));
  };

  render() {
    // console.log(this.props.auth);
    return (
      <div
        style={{
          flex: 1,
          height: "100vh",
        }}
        className="background"
      >
        <div className="container loginSection">
          <div className="row ">
            <div className="col-md-8 col-12 formSection p-4">
              <h2 className="text-center">Login</h2>
              {this.props.auth.errorMessage.length >= 2 ? (
                <div className="text-center alert alert-danger">
                  {this.props.auth.errorMessage}
                </div>
              ) : (
                ""
              )}
              <form
                className="form-horizontal"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field
                  type="text"
                  name="name"
                  label="Name"
                  component={this.renderInput}
                  placeholder="Name"
                  id="txtUser"
                  readonly={false}
                />
                <Field
                  type="email"
                  name="email"
                  label="Email"
                  component={this.renderInput}
                  placeholder="Email Address"
                  id="txtUserName"
                  readonly={false}
                />

                <div style={{ position: "relative" }}>
                  <i
                    className="fas fa-eye bi bi-eye-fill show"
                    style={{
                      position: "absolute",
                      top: "60%",
                      right: "10%",
                      zIndex: 100,
                      cursor: "pointer",
                    }}
                  ></i>
                  <Field
                    type="password"
                    name="password"
                    label="Password"
                    component={this.renderInput}
                    placeholder="Password"
                    id="txtPassword"
                    readonly={true}
                    onFocus={() => {
                      $(this).removeAttr("readonly");
                    }}
                  />
                </div>

                <div className="d-none d-md-block centerDiv"></div>

                <div className="form-group row text-center mt-2">
                  <div className="col-12">
                    <button
                      className="btn btn-md btn-block btn-danger rounded-pill waves-effect waves-light"
                      type="submit"
                    >
                      Login In
                    </button>
                    <br />
                    <span className="d-block d-lg-none">
                      Don't have a account{" "}
                      <Link to="/signup" className="">
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-md-4 logoSection d-none d-md-block">
              <div>
                <h3 className="form-logo text-center">logo</h3>
                <h1 className="text-center mb-4 hi-logo">Hi!!</h1>
                <Link to="signup" className="signin-btn text-center">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formValues) {
  const errors = {};
  if (!formValues.password) {
    errors.password = "Password is required.";
  }
  if (!formValues.name) {
    errors.name = "Name is required.";
  }
  if (!formValues.email) {
    errors.email = "Email is required.";
  }
  return errors;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default compose(
  reduxForm({ form: "signinForm", validate }),
  connect(mapStateToProps, { signin })
)(withRouter(Signin));
