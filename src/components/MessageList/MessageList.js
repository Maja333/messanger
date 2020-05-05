import React from "react";
import "./MessageList.scss";

const MessageList = () => {
  return (
    <div className="MessageList">
      <ul>
        <li className="myComment">
          <p className="message">wiadomosc wiadomosc wiadomosc wiadomosc</p>
          <p className="time">12:00</p>
        </li>
        <li>
          <p className="message">wiadomosc 1</p>
          <p className="time">12:00</p>
        </li>
        <li className="myComment">
          <p className="message">wiadomosc 1</p>
          <p className="time">12:00</p>
        </li>
        <li>
          <p className="message">wiadomosc 1</p>
          <p className="time">12:00</p>
        </li>
      </ul>
    </div>
  );
};

export default MessageList;
