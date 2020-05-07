import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import "./App.scss";
import ChatInput from "../ChatInput/ChatInput";
import Form from "../Form/Form";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import ToolBar from "../ToolBar/ToolBar";

function App() {
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [nick, setNick] = useState(false);
  const [error, setError] = useState(false)

  const cookies = new Cookies();

  useEffect(()=>{
    const checkCookie = cookies.get('nick');
    if(checkCookie !== undefined){
      setNick(checkCookie);
    }
    refreshData();
  },[]);

  const refreshData = () => {
    fetch('http://localhost:3000/messages')
    .then(response => response.json())
    .then(data => {
      setMessageList(data);
    })

    fetch('http://localhost:3000/userList')
    .then(response => response.json())
    .then(data => {
      setUserList(data);
    })
  };



  const saveNick = (nickName) =>  {

    const arr = userList.filter((el)=>{
      return  el.nick === nickName;
    })

    if(arr.length > 0) {
      setError(true);
      return
    }
    else {
      setError(false)
    }

    fetch('http://localhost:3000/userList', {
      method: 'POST',
      body: JSON.stringify({nick: nickName}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then ((data) => {
        cookies.set('nick', data , { path: '/' });
        setNick(data);
        console.log(data);
        refreshData()
      })

  };

  const saveMessage = (message) => {

    if(message === ""){
      return;
    }

    const msg = {
      message: message, 
      nick: nick.nick, 
      hour: `${new Date().getHours()} : ${new Date().getMinutes()}`
    };

    fetch('http://localhost:3000/messages', {
      method: 'POST',
      body: JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then (() => refreshData())
  };

  const logOut = () =>  {
    setNick(false);
    cookies.remove('nick');


    fetch(`http://localhost:3000/userList/${nick.id}`, {
      method: 'DELETE'
    })
      .then (() => refreshData())
  };

  return (
    <div className="container">
      {nick === false ?  <Form callback={saveNick} error={error}/> :  <></> }
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
          <UserList userList={userList} logOut={logOut}/>
        </div>
      </div>
    </div>
  );
}

export default App;
