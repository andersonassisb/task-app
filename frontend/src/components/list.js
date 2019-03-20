import React from "react";

const List = props => {
  return (
    <React.Fragment>
      <div className="list">
        <table className="list-table">
          <tr>
            <td>
              {props.task &&
                props.task.map((task, i) => <p key={i}>{task.title}</p>)}
            </td>
            <td>
              {props.task &&
                props.task.map((task, i) => <p key={i}>{task.content}</p>)}
            </td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
};

export default List;
