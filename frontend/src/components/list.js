import React, { Component } from "react";
import swal from "sweetalert";
import { FaRegWindowClose } from "react-icons/fa";

class List extends Component {
  updateList = () => this.props.updateList();

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

  render() {
    return (
      <React.Fragment>
        <div className="list">
          <table className="list-table">
            <tbody>
              {this.props.task &&
                this.props.task.map((taskItem, i) => (
                  <tr key={i}>
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
