import React, { Component } from "react";
import swal from "sweetalert";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Edit from "./edit";

class List extends Component {
  state = {
    tasks: [],
    id: ""
  };
  updateList = () => this.props.updateList();
  hideComponentsWhenEditing = pass => this.props.disable(pass);
  disableFunction = pass => this.props.callInsert(pass);

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
            window.location.reload();
            this.updateList();
          }
        });
      } else {
        swal("Delete task cancel!");
      }
    });
  };

  editTask = taskId => {
    this.setState({ id: taskId });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.id && (
            <Edit
              disable={() => this.disableFunction(true)}
              editTask={this.state.id}
            />
          )}
        </div>
        <div className="list">
          {this.props.task &&
            this.props.task.map(
              (taskItem, i) =>
                taskItem.status === this.props.status && (
                  <ul className="collection" key={i}>
                    <li className="collection-item avatar">
                      {this.props.status && (
                        <p>
                          <label>
                            <input
                              className="with-gap"
                              name="checkStatus"
                              type="checkbox"
                              onChange={() => {
                                this.statusDone(taskItem._id);
                              }}
                            />
                            <span>grey</span>
                          </label>
                        </p>
                      )}
                      <span className="title">{taskItem.title}</span>
                      <p>{taskItem.content}</p>

                      <a href="#!" className="secondary-content">
                        <div
                          onClick={() => {
                            this.deleteTask(taskItem._id);
                          }}
                        >
                          <MdDelete />
                        </div>
                        <div
                          onClick={() => {
                            this.editTask(taskItem._id);
                            this.hideComponentsWhenEditing(true);
                          }}
                        >
                          <MdEdit />
                        </div>
                      </a>
                    </li>
                  </ul>
                )
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default List;
