import React, { Component } from "react";
import { MdCheckCircle } from "react-icons/md";

class Header extends Component {
  deleteAllTasks = pass => this.props.deleteAll(pass);
  addTask = () => this.props.addTask();
  statusTask = pass => this.props.status(pass);
  render() {
    return (
      <nav className="nav-extended navbar-fixed">
        <div className="nav-wrapper blue">
          <a href="#" className="brand-logo">
            <i className="material-icons">
              <MdCheckCircle />
            </i>
            {this.props.title}
          </a>
          <ul className="right">
            <li>
              <a href="#">
                <i className="material-icons">search</i>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.deleteAllTasks(true);
                }}
              >
                <i className="material-icons">delete</i>
              </a>
            </li>
          </ul>
        </div>
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
          <a
            className="btn-floating btn-large halfway-fab waves-effect waves-light grey"
            style={{ position: "fixed", bottom: "20px" }}
            onClick={() => {
              this.addTask();
            }}
          >
            <i className="material-icons">add</i>
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
