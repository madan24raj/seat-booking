import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sideNav.css";

import image from "./logo.svg";

const Sidebar = (props) => {
  const [isNotActive, setNotActive] = useState("true");
  var barsIcon =  <i className="fas fa-bars"></i>
  var crossIcon =  <i className="fas fa-arrow-circle-left"></i>
  return (
    <div>
      <div className="wrapper">
        <nav id="sidebar" className={isNotActive ? "" : "active"}>
          <button
            type="button"
            id="sidebarCollapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom"
          >
            <span className={ isNotActive ? 'hidden' : '' }>{ barsIcon }</span>
            <span className={ isNotActive ? '' : 'hidden' }>{ crossIcon }</span>
          </button>
          <div className="sidebar-header">
            <img
              src={image}
              className="rounded-circle usr-image"
              height={isNotActive ? "70" : "20"}
              width={isNotActive ? "70" : "20"}
            ></img>
          </div>

          <ul className="list-unstyled components">
            <li className="list-item">
            <Link to="/"> <i className="fas fa-home icon-color"></i></Link>

             
             <span> <Link to="/">Home</Link></span>
            </li>
            <li className="list-item">
            <Link to="/wing"> <i className="fas fa-table icon-color"></i></Link>

             
              <span><Link to="/wing">Wing</Link></span>
            </li>

            <li className="list-item">
            <Link to="/book"> <i className="fas fa-calendar icon-color"></i></Link>

             
              <span><Link to="/book">Booking</Link></span>
            </li>
            <li className="list-item">
            <Link to="/mybooking"> <i className="fas fa-cart-plus icon-color"></i></Link>
             
              <span><Link to="/mybooking">My Booking</Link></span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;