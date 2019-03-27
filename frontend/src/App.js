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
    callEdit: false,
    callButton: false,
    deleteAll: false,
    statusPass: true,
    taskStatusChange: true
  };

  callInsert = () => {
    this.setState({ call: true });
  };

  edit = pass => {
    this.setState({ callEdit: !pass });
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
      .then(tasks => {
        if (tasks.length) {
          this.setState({ tasks, loading: false });
        } else {
          this.setState({ tasks: [], loading: false });
        }
      });
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
      statusPass,
      callEdit
    } = this.state;
    return (
      <React.Fragment>
        <Header
          title="Taskaryen"
          deleteAll={() => this.deleteAllTasks(deleteAll)}
          status={pass => this.status(pass)}
          newTask={call}
        />

        {!call && !callEdit && (
          <div className="search-nav">
            <Search
              handleChange={e => {
                this.filterTask(e);
              }}
              callEdit={callEdit}
            />
          </div>
        )}

        {filteredTask && <NotFound show={selectedTask.length === 0 && true} />}

        {disableComponents && call && <Insert updateList={this.getTasks} />}

        {loading && (
          <div>
            <FaSpinner className="icon-spin loading" />
            <p className="empty-text">Loading what to do...</p>
          </div>
        )}

        {!call && (
          <List
            updateList={this.getTasks}
            task={
              selectedTask.length > 0 ? selectedTask : !filteredTask && tasks
            }
            disable={disable => this.disableInserting(disable)}
            status={statusPass && statusPass}
            statusDone={taskStatusChange => this.statusChange(taskStatusChange)}
            newTask={pass => this.edit(pass)}
            loading={loading}
          />
        )}

        {disableComponents && (
          <a
            href="#callinsert"
            className="btn-floating btn-large halfway-fab waves-effect waves-light blue"
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
