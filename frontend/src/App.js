import React, { Component } from "react";
import "./App.css";
import List from "./components/list.js";
import Insert from "./components/insert.js";
import Edit from "./components/edit.js";
import Delete from "./components/delete.js";
import Header from "./components/header.js";

class App extends Component {
  state = {
    tasks: [],
    activedTasks: false,
    completedTasks: false,
    selectedTask: []
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    fetch("http://localhost:3030/tasks")
      .then(response => response.json())
      .then(tasks => this.setState({ tasks }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <React.Fragment>
        <Header title="Tasks" />
        <Insert updateList={this.getTasks} />
        <List updateList={this.getTasks} task={tasks.length > 0 && tasks} />
      </React.Fragment>
    );
  }
}

export default App;
