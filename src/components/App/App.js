import React from "react";
import "./App.scss";
import ChatInput from "../ChatInput/ChatInput";
// import Form from "../Form/Form";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import ToolBar from "../ToolBar/ToolBar";

function App() {
  return (
    <div className="container">
      <ToolBar />
      <div className="content">
        <div className="left">
          <div className="chatMessage"><MessageList /></div>
          <div><ChatInput /></div>
        </div>
        <div className="right">
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
