import React, { Component } from "react";
import { MdCheckCircle } from "react-icons/md";

class Header extends Component {
  deleteAllTasks = pass => this.props.deleteAll(pass);
  addTask = () => this.props.addTask();
  render() {
    return (
      <nav class="nav-extended navbar-fixed">
        <div class="nav-wrapper blue">
          <a href="#" class="brand-logo">
            <i class="material-icons">
              <MdCheckCircle />
            </i>
            {this.props.title}
          </a>
          <ul class="right">
            <li>
              <a href="#">
                <i class="material-icons">search</i>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  this.deleteAllTasks(true);
                }}
              >
                <i class="material-icons">delete</i>
              </a>
            </li>
          </ul>
        </div>
        <div class="nav-content blue">
          <ul class="tabs tabs-transparent">
            <li class="tab">
              <a href="#active">Today</a>
            </li>
            <li class="tab">
              <a class="active" href="#done">
                Done
              </a>
            </li>
          </ul>
          <a
            class="btn-floating btn-large halfway-fab waves-effect waves-light grey"
            onClick={() => {
              this.addTask();
            }}
          >
            <i class="material-icons">add</i>
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
