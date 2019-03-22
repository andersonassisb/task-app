import React, { Component } from "react";
import "./App.css";
import List from "./components/list.js";
import Insert from "./components/insert.js";
import Edit from "./components/edit.js";
import Header from "./components/header.js";
import { FaSpinner } from "react-icons/fa";

class App extends Component {
  state = {
    loading: true,
    tasks: [],
    activedTasks: false,
    completedTasks: false,
    selectedTask: []
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    this.setState({ loading: true });

    fetch("http://localhost:3030/tasks")
      .then(response => response.json())
      .then(tasks => this.setState({ tasks, loading: false }));
  };

  render() {
    const { tasks, loading } = this.state;
    return (
      <React.Fragment>
        <Header title="Tasks" />
        <Insert updateList={this.getTasks} />
        {loading && <FaSpinner className="icon-spin" />}
        <List updateList={this.getTasks} task={tasks.length > 0 && tasks} />
      </React.Fragment>
    );
  }
}

export default App;
