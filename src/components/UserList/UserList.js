import React from "react";
import "./UserList.scss";

const UserList = props => {
  const { userList,logOut } = props;

  const li = userList.map((el, index) => <li key={index}>{el.nick}</li>);


  return (
    <div className="UserList">
      <ul>{li}</ul>
      <button className="btn" onClick={logOut}>Wyloguj</button>
    </div>
  );
};

export default UserList;
