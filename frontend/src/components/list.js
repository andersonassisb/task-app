import React, { Component } from "react";
import swal from "sweetalert";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Edit from "./edit";

class List extends Component {
  state = {
    tasks: [],
    id: ""
  };
  updateList = () => this.props.updateList();
  hideComponentsWhenEditing = pass => this.props.disable(pass);
  disableFunction = pass => this.props.callInsert(pass);

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
          {this.props.task.length > 0 && (
            <div
              onClick={() => {
                this.deleteAllTasks();
              }}
            >
              <FaRegWindowClose />
            </div>
          )}
          <table className="list-table">
            <tbody>
              {this.props.task &&
                this.props.task.map((taskItem, i) => (
                  <tr key={i}>
                    <td className="task-status align-middle text-center" />
                    <td className="task-title align-middle text-center">
                      <p>{taskItem.title}</p>
                    </td>
                    <td className="task-content align-middle text-center">
                      <p>{taskItem.content}</p>
                    </td>
                    <td className="task-img align-middle text-center">
                      <div
                        onClick={() => {
                          this.deleteTask(taskItem._id);
                        }}
                      >
                        <FaRegWindowClose />
                      </div>
                    </td>
                    <td className="task-img align-middle text-center">
                      <div
                        onClick={() => {
                          this.editTask(taskItem._id);
                          this.hideComponentsWhenEditing(true);
                        }}
                      >
                        <FaRegEdit />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default List;
