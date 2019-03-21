import React from "react";

const List = props => {
  return (
    <React.Fragment>
      <div className="list">
        <table className="list-table">
          <tbody>
            {props.task &&
              props.task.map((task, i) => (
                <tr key={i}>
                  <td>
                    <p>{task.title}</p>
                  </td>
                  <td>
                    <p>{task.content}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default List;
