import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

const Header = () => {
  function renderFirst() {
    $(".navbar-toggler").on("click", function (event) {
      /* Act on the event */
      $(".bar1").toggleClass("toogle");
      $(".bar3").toggleClass("toogle1");
      $(".bar2").toggleClass("toogle2");
    });
  }

  useEffect(() => {
    renderFirst();
  }, []);

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
                  to="/"
                  className={`nav-link  px-4  ${
                    window.location.pathname === "/" ? "active" : ""
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
                <a className="nav-link  px-4" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="user d-none d-md-block">
            <i className="fa-solid fa-user-large"></i>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
