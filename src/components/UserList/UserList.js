import React from "react";
import "./UserList.scss";

const UserList = props => {
  const { userList } = props;

  const li = userList.map((el, index) => <li key={index}>{el}</li>);

  return (
    <div className="UserList">
      <ul>{li}</ul>
    </div>
  );
};

export default UserList;
