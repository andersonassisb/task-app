import React, { Component } from "react";

class Insert extends Component {
  state = {
    title: "",
    content: "",
    status: ""
  };

  getDb(statusBool) {
    try {
      this.global.db.collection("task").insert({
        title: this.state.title,
        content: this.state.content,
        status: statusBool
      });
    } catch (err) {
      console.log({ error: "insert failed" });
    }
  }

  insertTask() {
    try {
      const statusBool = this.state.status === "true";
      this.getDb(statusBool);
    } catch (err) {
      console.log({ error: "insert failed" });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="insert">
          <input
            type="text"
            className="title"
            onInput={e => this.setState({ title: e.target.value })}
          />
          <input
            type="text"
            className="content"
            onInput={e => this.setState({ content: e.target.value })}
          />
          <input
            type="text"
            className="status"
            onInput={e => this.setState({ status: e.target.value })}
          />
          <button onClick={() => this.insertTask()}>+</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Insert;
