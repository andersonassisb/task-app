import React, { Component } from "react";
import swal from "sweetalert";

class Edit extends Component {
  state = {
    id: "",
    title: "",
    content: "",
    pass: false,
    editing: true
  };
  newTask = pass => this.props.newTask(pass);
  hideComponentsWhenInserting = pass => {
    this.props.disable(pass);
  };

  updateList = () => this.props.updateList();

  leaveEditing = pass => {
    this.props.leaveEditing(pass);
  };

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
            if (willConfirm) {
              //window.location.reload();
              this.leaveEditing(this.setState.editing);
              this.hideComponentsWhenInserting(false);
              this.newTask(true);
              this.updateList();
            }
          });
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.editTask && (
          <div className="edit" style={{ padding: "10px" }}>
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
              <button
                className="btn waves-effect waves-light grey"
                type="submit"
                name="action"
                style={{ width: "100%" }}
              >
                Update
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Edit;
