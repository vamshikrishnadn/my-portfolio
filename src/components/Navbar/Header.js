import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router";

import { logout } from "../../actions/userActions";

class Header extends React.Component {
  componentDidMount() {
    $(".navbar-toggler").on("click", function (event) {
      /* Act on the event */
      $(".bar1").toggleClass("toogle");
      $(".bar3").toggleClass("toogle1");
      $(".bar2").toggleClass("toogle2");
    });
  }

  render() {
    return (
      <section className="nav">
        <div className="cus-container ">
          <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
            <Link className="navbar-brand" to="/">
              <span className="logo">Logo</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="toggler-btn d-flex flex-column">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className={`nav-item`}>
                  <Link
                    to="/home"
                    className={`nav-link  px-4  ${
                      window.location.pathname === "/home" ? "active" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link  px-4  ${
                      window.location.pathname === "/services" ? "active" : ""
                    }`}
                    to="/services"
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link  px-4  ${
                      window.location.pathname === "/upload" ? "active" : ""
                    }`}
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link d-block d-md-none px-4  ${
                      window.location.pathname === "/user" ? "active" : ""
                    }`}
                    to="/user"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="user d-none d-md-block">
              <Link to="/user" className="btn btn-warning text-white">
                Profile
              </Link>
              <a
                onClick={() => this.props.logout(this.props.history)}
                className="btn btn-danger text-white ml-2"
              >
                Logout
              </a>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

export default compose(connect(null, { logout }))(withRouter(Header));
