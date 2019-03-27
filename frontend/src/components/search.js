import React, { Component } from "react";

class Search extends Component {
  handleSearch = e => this.props.handleChange(e);
  render() {
    return (
      <div className="form-group input-field" style={{ paddingTop: "10px" }}>
        <div className="row">
          <div className="col s1">
            <i
              className="material-icons"
              style={{ marginTop: "12px", color: "#fff" }}
            >
              search
            </i>
          </div>
          <div className="col s11">
            <input
              id="search"
              className="search-style"
              type="text"
              required
              onChange={e => this.handleSearch(e)}
              placeholder="Type here to search for tasks ..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
