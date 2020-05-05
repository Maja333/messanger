import React from 'react';
import './ChatInput.scss';

const ChatInput = () => {
    return (
        <div className='ChatInput'>
            <div className='flex'>
                <input className='input' placeholder='Type a message...'></input>
                <button>W</button>
            </div>
        </div>
    )
}

export default ChatInput;