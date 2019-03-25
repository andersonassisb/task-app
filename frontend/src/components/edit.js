import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";
import swal from "sweetalert";

class Edit extends Component {
  state = {
    id: "",
    title: "",
    content: "",
    pass: false
  };
  hideComponentsWhenInserting = pass => this.props.disable(pass);

  getTaskId = () => {
    this.setState({ id: this.props.editTask });
    fetch(`http://localhost:3030/tasks/${this.props.editTask}`)
      .then(response => response.json())
      .then(taskItem => {
        this.setState({
          title: taskItem[0].title,
          content: taskItem[0].content,
          pass: true
        });
      });
  };

  componentDidMount() {
    this.getTaskId();
  }

  updateTask = e => {
    const { id, title, content, pass } = this.state;
    e.preventDefault();

    pass &&
      fetch("http://localhost:3030/tasks/update", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          title: title,
          content: content,
          status: pass
        })
      }).then(response => {
        if (response.status !== 200) {
          console.log("Problem encontred!");
        } else {
          this.setState({ pass: true });
          swal("Updated task!").then(willConfirm => {
            if (willConfirm) window.location.reload();
          });
          //this.hideComponentsWhenInserting(true);
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.editTask && (
          <div className="edit">
            <form onSubmit={e => this.updateTask(e)}>
              <input
                type="text"
                className="title"
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Title"
                defaultValue={this.state.title}
                required
              />
              <input
                type="text"
                className="content"
                onChange={e => this.setState({ content: e.target.value })}
                placeholder="Description"
                defaultValue={this.state.content}
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
