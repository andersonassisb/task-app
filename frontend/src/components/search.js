import React, { Component } from "react";

class Search extends Component {
  handleSearch = e => this.props.handleChange(e);
  render() {
    return (
      <div className="form-group input-field" style={{ padding: "10px" }}>
        <input
          id="search"
          type="text"
          required
          onChange={e => this.handleSearch(e)}
        />
        <label htmlFor="search">
          <i className="material-icons">search</i>
        </label>
      </div>
    );
  }
}

export default Search;
