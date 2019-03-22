import React, { Component } from "react";

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
      console.log(response.status);
      if (response.status !== 200) {
        console.log("Problem encontred!");
      } else {
        this.updateList();
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
              onInput={e => this.setState({ title: e.target.value })}
              placeholder="Title"
              required
            />
            <input
              type="text"
              className="content"
              onInput={e => this.setState({ content: e.target.value })}
              placeholder="Description"
            />
            <button type="submit">+</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Insert;
