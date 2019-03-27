import React, { Component } from "react";
import { MdCheckCircle } from "react-icons/md";

class Header extends Component {
  deleteAllTasks = pass => this.props.deleteAll(pass);
  statusTask = pass => this.props.status(pass);
  render() {
    return (
      <nav className="nav-extended navbar-fixed">
        <div className="nav-wrapper blue">
          <a href="#logo" className="brand-logo">
            {this.props.title}
          </a>
          <ul className="right">
            <li>
              <a
                href="#delete"
                onClick={() => {
                  this.deleteAllTasks(true);
                }}
              >
                <i className="material-icons">delete</i>
              </a>
            </li>
          </ul>
        </div>
        {!this.props.newTask ? (
          <div className="nav-content blue">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <a
                  className="active"
                  href="#active"
                  onClick={() => {
                    this.statusTask(true);
                  }}
                >
                  Today
                </a>
              </li>
              <li className="tab">
                <a
                  className="active"
                  href="#done"
                  onClick={() => {
                    this.statusTask(false);
                  }}
                >
                  Done
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav-content blue">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <a
                  className="active"
                  href="#active"
                  onClick={() => {
                    this.statusTask(true);
                  }}
                >
                  Add New Task
                </a>
              </li>
              <li class="indicator" style={{ left: "0px", right: "0px" }} />
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default Header;
