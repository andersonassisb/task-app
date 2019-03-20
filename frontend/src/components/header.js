import React from "react";

const Header = props => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="mx-auto text-white">
        <h3>{props.title}</h3>
      </div>
    </nav>
  );
};

export default Header;
