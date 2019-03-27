import React, { Component } from "react";
import "./App.css";
import List from "./components/list.js";
import Insert from "./components/insert.js";
import Header from "./components/header.js";
import { FaSpinner } from "react-icons/fa";
import swal from "sweetalert";
import Search from "./components/search";
import NotFound from "./components/notfound";

class App extends Component {
  state = {
    disableComponents: true,
    loading: true,
    tasks: [],
    activedTasks: false,
    completedTasks: false,
    filteredTask: false,
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

  filterTask = e => {
    if (e.target.value.length > 0) {
      this.setState({ filteredTask: true });
      const selectTask = this.state.tasks.filter(task =>
        task.title.toLowerCase().match(e.target.value.toLowerCase())
      );
      this.setState({ selectedTask: selectTask });
    } else {
      this.setState({ selectedTask: [], filteredTask: false });
    }
  };

  render() {
    const {
      tasks,
      loading,
      disableComponents,
      call,
      deleteAll,
      filteredTask,
      selectedTask,
      statusPass
    } = this.state;
    return (
      <React.Fragment>
        <Header
          title="Tasks"
          deleteAll={() => this.deleteAllTasks(deleteAll)}
          status={pass => this.status(pass)}
          newTask={call}
        />

        {!call && (
          <Search
            handleChange={e => {
              this.filterTask(e);
            }}
          />
        )}

        {filteredTask && <NotFound show={selectedTask.length === 0 && true} />}

        {disableComponents && call && <Insert updateList={this.getTasks} />}

        {loading && <FaSpinner className="icon-spin" />}

        {!call && (
          <List
            updateList={this.getTasks}
            task={
              selectedTask.length > 0
                ? selectedTask
                : !filteredTask && tasks.length > 0 && tasks
            }
            disable={disable => this.disableInserting(disable)}
            status={statusPass && statusPass}
            statusDone={taskStatusChange => this.statusChange(taskStatusChange)}
          />
        )}

        {disableComponents && (
          <a
            href="#callinsert"
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
