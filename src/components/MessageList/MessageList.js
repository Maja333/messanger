import React from "react";
import "./MessageList.scss";

const MessageList = props => {
  const { messageList, nick } = props;

  const li = messageList.map((el, index) => (
    <li key={index}>
      <div className={nick === el.nick ? "message myComment" : "message"}>
        <p>{el.message}</p>
        <p className="time">{el.hour}</p>
      </div>
    </li>
  ));

  return (
    <div className="MessageList">
      <ul>{li}</ul>
    </div>
  );
};

export default MessageList;
