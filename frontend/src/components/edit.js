import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import swal from "sweetalert";

class Edit extends Component {
  state = {
    title: "",
    content: "",
    pass: false
  };

  taskId = () => this.props.editTask;

  getTaskId = () => {
    fetch(`http://localhost:3030/tasks/${this.taskId()}`)
      .then(response => response.json())
      .then(taskItem =>
        this.setState({
          title: taskItem.title,
          content: taskItem.content,
          pass: true
        })
      );
  };

  updateTask = e => {
    const { title, content, pass } = this.state;
    e.preventDefault();

    pass === true &&
      fetch("http://localhost:3030/tasks/edit", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      }).then(response => {
        if (response.status !== 200) {
          console.log("Problem encontred!");
        } else {
          swal("Updated task!");
          this.setState({ title: "", content: "" });
        }
      });
  };

  render() {
    //console.log(this.taskEdit());
    return (
      <React.Fragment>
        {this.taskId() && (
          <div className="edit">
            <form onSubmit={e => this.updateTask(e)}>
              <input
                type="text"
                className="title"
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Title"
                value={this.state.title && this.state.title}
                required
              />
              <input
                type="text"
                className="content"
                onChange={e => this.setState({ content: e.target.value })}
                placeholder="Description"
                value={this.state.content && this.state.content}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Edit;
