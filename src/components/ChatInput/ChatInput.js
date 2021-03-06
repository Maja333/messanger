import React,{useState} from 'react';
import './ChatInput.scss';

const ChatInput = (props) => {
    const {callback} = props;
    const [inputValue, setInputValue] = useState("");

    const onZapisz = () => {
        callback(inputValue);
        setInputValue("");
      };

    const enter = (event) => {
      if(event.key === "Enter"){
          onZapisz();
      }
    };

    return (
      <div className='ChatInput'>
            <div className='flex'>
                <input className='input' placeholder='Type a message...' value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={enter}></input>
                <button className='btn-round' onClick={onZapisz}></button>
            </div>
        </div>
    )
}

export default ChatInput;