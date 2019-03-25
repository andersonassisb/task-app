import React, { Component } from "react";
import { timingSafeEqual } from "crypto";

class Insert extends Component {
  state = {
    title: "",
    content: ""
  };

  updateList = () => this.props.updateList();

  insertTask = e => {
    e.preventDefault();
    const statusBool = true;

    fetch("http://localhost:3030/tasks/insert", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        status: statusBool
      })
    }).then(response => {
      if (response.status !== 200) {
        console.log("Problem encontred!");
      } else {
        this.updateList();
        this.setState({ title: "", content: "" });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="insert">
          <form onSubmit={e => this.insertTask(e)}>
            <input
              type="text"
              className="title"
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="Title"
              value={this.state.title}
              required
            />
            <input
              type="text"
              className="content"
              onChange={e => this.setState({ content: e.target.value })}
              value={this.state.content}
              placeholder="Description"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Insert;
