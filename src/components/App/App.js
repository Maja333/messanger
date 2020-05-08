import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "./App.scss";
import ChatInput from "../ChatInput/ChatInput";
import Form from "../Form/Form";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import ToolBar from "../ToolBar/ToolBar";
import CookiesAllert from "../CookiesAllert/CookiesAllert";

function App() {
  const [userList, setUserList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [nick, setNick] = useState(false);
  const [error, setError] = useState(false);
  const [scroll, setScroll] = useState(null);

  const cookies = new Cookies();

  useEffect(() => {
    const checkCookie = cookies.get("nick");
    if (checkCookie !== undefined) {
      setNick(checkCookie);
    }
    refreshData();

    const intervalID = setInterval(() => {
      refreshData();
    }, 5000);

    return () => {
      clearInterval(intervalID);
    };
  }, [scroll]);

  const refreshData = () => {
    fetch("http://json.digitup.net//messages")
      .then(response => response.json())
      .then(data => {
        setMessageList(data);
        if (scroll !== null) {
          console.log(scroll.firstElementChild);
          scroll.scrollTop = scroll.scrollHeight;
        } else {
          console.log("scroll in null");
        }
      });

    fetch("http://json.digitup.net//userList")
      .then(response => response.json())
      .then(data => {
        setUserList(data);
      });
  };

  const saveNick = nickName => {
    const arr = userList.filter(el => {
      return el.nick === nickName;
    });

    if (arr.length > 0) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    fetch("http://json.digitup.net//userList", {
      method: "POST",
      body: JSON.stringify({ nick: nickName }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        cookies.set("nick", data, { path: "/" });
        setNick(data);
        console.log(data);
        refreshData();
      });
  };

  const saveMessage = message => {
    if (message === "") {
      return;
    }

    const msg = {
      message: message,
      nick: nick.nick,
      hour: `${new Date().getHours()} : ${new Date().getMinutes()}`
    };

    fetch("http://json.digitup.net//messages", {
      method: "POST",
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => refreshData());
  };

  const logOut = () => {
    setNick(false);
    cookies.remove("nick");

    fetch(`http://json.digitup.net//userList/${nick.id}`, {
      method: "DELETE"
    }).then(() => refreshData());
  };

  return (
    <div className="container">
      <CookiesAllert />
      {nick === false ? <Form callback={saveNick} error={error} /> : <></>}
      <ToolBar />
      <div className="content">
        <div className="left">
          <div className="chatMessage" ref={el => {setScroll(el);}}>
            {nick !== false ? (
              <MessageList messageList={messageList} nick={nick} />
            ) : (
              <></>
            )}
          </div>
          <div>
            <ChatInput callback={saveMessage} />
          </div>
        </div>
        <div className="right">
          <UserList userList={userList} logOut={logOut} />
        </div>
      </div>
    </div>
  );
}

export default App;
