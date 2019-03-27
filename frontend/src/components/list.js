import React, { Component } from "react";
import swal from "sweetalert";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Edit from "./edit";
import EmptyTask from "./empty-task.png";

class List extends Component {
  state = {
    tasks: [],
    id: "",
    editing: false
  };
  newTask = pass => this.props.newTask(pass);
  updateList = () => this.props.updateList();
  hideComponentsWhenEditing = pass => this.props.disable(pass);

  disableFunction = () => {
    this.setState({ id: "" });
    this.hideComponentsWhenEditing(true);
  };

  showList = () => {
    this.setState({ editing: false });
    //window.location.reload();
  };

  componentDidUpdate() {
    window.$(".collapsible").collapsible();
  }

  statusDone = taskId => {
    fetch("http://localhost:3030/tasks/status_done", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: taskId })
    }).then(response => {
      if (response.status !== 200) {
        console.log("Problem encontred!");
      } else {
        swal("Task completed!", {
          icon: "success"
        });
        this.updateList();
      }
    });
  };

  deleteAllTasks = () => {
    fetch("http://localhost:3030/tasks/delete_all").then(response => {
      if (response.status !== 200) {
        console.log("Problem encontred!");
      } else {
        swal("All tasks has been deleted!", {
          icon: "success"
        });
        this.updateList();
      }
    });
  };

  deleteTask = taskId => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        fetch("http://localhost:3030/tasks/delete", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: taskId
          })
        }).then(response => {
          if (response.status !== 200) {
            console.log("Problem encontred!");
          } else {
            swal("The task has been deleted!", {
              icon: "success"
            });
            //window.location.reload();
            this.updateList();
          }
        });
      } else {
        swal("Delete task cancel!");
      }
    });
  };

  editTask = taskId => {
    this.setState({ id: taskId, editing: true });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.id && (
            <Edit
              disable={pass => this.disableFunction(pass)}
              editTask={this.state.id}
              leaveEditing={pass => this.showList(pass)}
              updateList={this.updateList}
              newTask={this.newTask}
            />
          )}
        </div>
        {!this.state.editing && (
          <React.Fragment>
            {!this.props.loading &&
              this.props.task &&
              this.props.task.filter(task => task.status === this.props.status)
                .length === 0 && (
                <div>
                  <img className="empty" src={EmptyTask} alt="Empty" />
                  <p className="empty-text">
                    {this.props.status === true
                      ? "It looks like you have nothing to do today"
                      : "Nothing done yet, hey!?"}
                  </p>
                </div>
              )}

            {this.props.task &&
              this.props.task.filter(task => task.status === this.props.status)
                .length > 0 && (
                <ul className="collapsible" style={{ marginTop: 0 }}>
                  {this.props.task.length > 0 &&
                    this.props.task.map(
                      (taskItem, i) =>
                        taskItem.status === this.props.status && (
                          <li key={i}>
                            <div className="collapsible-header">
                              <label>
                                {this.props.status && (
                                  <input
                                    className="with-gap"
                                    name="checkStatus"
                                    type="checkbox"
                                    onChange={() => {
                                      this.statusDone(taskItem._id);
                                    }}
                                  />
                                )}
                                {!this.props.status && (
                                  <input
                                    className="with-gap"
                                    name="checkStatus"
                                    type="checkbox"
                                    disabled
                                    defaultChecked={true}
                                  />
                                )}
                                <span className="title">{taskItem.title}</span>
                              </label>
                            </div>

                            <div className="collapsible-body">
                              <p>{taskItem.content}</p>

                              <div className="row">
                                {this.props.status && (
                                  <div className="col s6">
                                    <a
                                      href="#edit"
                                      style={{ width: "100%" }}
                                      className="waves-effect waves-light btn blue"
                                      onClick={e => {
                                        this.editTask(taskItem._id);
                                        this.hideComponentsWhenEditing(false);
                                        this.newTask(false);
                                      }}
                                    >
                                      <MdEdit /> Edit Task
                                    </a>
                                  </div>
                                )}

                                <div className="col s6">
                                  <a
                                    href="#delete"
                                    style={{ width: "100%" }}
                                    className="waves-effect waves-light btn red"
                                    onClick={() => {
                                      this.deleteTask(taskItem._id);
                                    }}
                                  >
                                    <MdDelete /> Delete Task
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                    )}
                </ul>
              )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default List;
