import React, { Component } from "react";
import "./App.css";
import List from "./components/list.js";
import Insert from "./components/insert.js";
import Edit from "./components/edit.js";
import Header from "./components/header.js";
import { FaSpinner } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import swal from "sweetalert";

class App extends Component {
  state = {
    disableComponents: true,
    loading: true,
    tasks: [],
    activedTasks: false,
    completedTasks: false,
    selectedTask: [],
    call: false,
    callButton: false,
    deleteAll: false,
    statusPass: true,
    taskStatusChange: true
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

  status = pass => {
    console.log(pass);
    this.setState({ statusPass: pass });
  };

  componentDidMount() {
    this.setState({ disableComponents: true, callButton: true });
    this.getTasks();
  }

  deleteAllTasks = () => {
    fetch("http://localhost:3030/tasks/delete_all").then(response => {
      if (response.status !== 200) {
        console.log("Problem encontred!");
      } else {
        swal("All tasks has been deleted!", {
          icon: "success"
        });
        this.getTasks();
      }
    });
  };

  statusChange = () => {};

  getTasks = () => {
    this.setState({ loading: true });

    fetch("http://localhost:3030/tasks")
      .then(response => response.json())
      .then(tasks => this.setState({ tasks, loading: false }));
  };

  render() {
    const {
      tasks,
      loading,
      disableComponents,
      call,
      callButton,
      deleteAll,
      statusPass
    } = this.state;
    return (
      <React.Fragment>
        <Header
          title="Tasks"
          deleteAll={() => this.deleteAllTasks(deleteAll)}
          addTask={disableComponents && callButton && this.callInsert}
          status={pass => this.status(pass)}
        />
        {disableComponents && call && <Insert updateList={this.getTasks} />}

        {loading && <FaSpinner className="icon-spin" />}

        <List
          updateList={this.getTasks}
          task={tasks.length > 0 && tasks}
          disable={() => this.disableInserting(disableComponents)}
          callInsert={() => this.disableEditing(callButton)}
          status={statusPass && statusPass}
          statusDone={taskStatusChange => this.statusChange(taskStatusChange)}
        />
      </React.Fragment>
    );
  }
}

export default App;
