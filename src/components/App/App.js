import React, { useState } from "react";
import "./App.scss";
import ChatInput from "../ChatInput/ChatInput";
import Form from "../Form/Form";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import ToolBar from "../ToolBar/ToolBar";

function App() {
  const [userList, setUserList] = useState(["szczur", "szczur1", "szczur2"]);
  const [messageList, setMessageList] = useState([
    { message: "m1", nick: "szczur1", hour: "12:00"},
    { message: "m2", nick: "szczur", hour: "15:00"},
    { message: "m3", nick: "szczur2", hour: "1:00"}
  ]);
  const [nick, setNick]=useState(false);

  const saveNick = (nickName) =>  {
    setNick(nickName);
    setUserList([...userList,nickName]);
  };

  const saveMessage = (message) => {
    setMessageList([...messageList,{message:message, nick:nick, hour:`${new Date().getHours()} : ${new Date().getMinutes()}`}]);
  };

  return (
    <div className="container">
      {nick === false ?  <Form callback={saveNick}/> :  <></> }
      <ToolBar />
      <div className="content">
        <div className="left">
          <div className="chatMessage">
            <MessageList messageList={messageList} nick={nick} />
          </div>
          <div>
            <ChatInput callback={saveMessage} />
          </div>
        </div>
        <div className="right">
          <UserList userList={userList} />
        </div>
      </div>
    </div>
  );
}

export default App;
