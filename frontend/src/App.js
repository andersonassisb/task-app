import React, { Component } from "react";
import "./App.css";
import List from "./components/list.js";
import Insert from "./components/insert.js";
import Edit from "./components/edit.js";
import Header from "./components/header.js";
import { FaSpinner } from "react-icons/fa";

class App extends Component {
  state = {
    disableComponents: true,
    loading: true,
    tasks: [],
    activedTasks: false,
    completedTasks: false,
    selectedTask: [],
    call: false,
    callButton: false
  };

  callInsert = () => {
    this.setState({ call: true });
  };
  disableInserting = () =>
    this.setState({
      disableComponents: !this.state.disableComponents
    });

  disableEditing = () =>
    this.setState({
      call: !this.state.call
    });

  componentDidMount() {
    this.setState({ disableComponents: true, callButton: true });
    this.getTasks();
  }

  getTasks = () => {
    this.setState({ loading: true });

    fetch("http://localhost:3030/tasks")
      .then(response => response.json())
      .then(tasks => this.setState({ tasks, loading: false }));
  };

  render() {
    const { tasks, loading, disableComponents, call, callButton } = this.state;
    return (
      <React.Fragment>
        <Header title="Tasks" />

        {disableComponents && callButton && (
          <button onClick={this.callInsert}>Add</button>
        )}

        {disableComponents && call && <Insert updateList={this.getTasks} />}

        {loading && <FaSpinner className="icon-spin" />}

        <List
          updateList={this.getTasks}
          task={tasks.length > 0 && tasks}
          disable={() => this.disableInserting(disableComponents)}
          callInsert={() => this.disableEditing(callButton)}
        />
      </React.Fragment>
    );
  }
}

export default App;
