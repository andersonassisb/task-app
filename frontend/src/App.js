import React, { Component } from "react";
import "./App.css";
import List from "./components/list.js";
import Insert from "./components/insert.js";
import Header from "./components/header.js";
import { FaSpinner } from "react-icons/fa";
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

  disableInserting = disable =>
    this.setState({
      disableComponents: disable
    });

  status = pass => {
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
      deleteAll,
      statusPass
    } = this.state;
    return (
      <React.Fragment>
        <Header
          title="Tasks"
          deleteAll={() => this.deleteAllTasks(deleteAll)}
          status={pass => this.status(pass)}
        />
        {disableComponents && call && <Insert updateList={this.getTasks} />}

        {loading && <FaSpinner className="icon-spin" />}

        {!call && (
          <List
            updateList={this.getTasks}
            task={tasks.length > 0 && tasks}
            disable={disable => this.disableInserting(disable)}
            status={statusPass && statusPass}
            statusDone={taskStatusChange => this.statusChange(taskStatusChange)}
          />
        )}

        {disableComponents && (
          <a
            className="btn-floating btn-large halfway-fab waves-effect waves-light grey"
            style={{ position: "fixed", bottom: "20px" }}
            onClick={() => {
              this.callInsert();
            }}
          >
            <i className="material-icons">add</i>
          </a>
        )}
      </React.Fragment>
    );
  }
}

export default App;
