import React, { useState } from 'react'
import Picker from 'emoji-picker-react';


export default function ChatInput({handelSendMsg}) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmojiPickerClick = (e) => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (e, emojiObject) => {
        console.log(emojiObject);
        setMessage(message + emojiObject.emoji);
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    const sendChat = (e) => {
        e.preventDefault();
        console.log(message);
        if(message.length > 0) {
            handelSendMsg(message);
            setMessage('');
        }
    }

  return (
    <div className='flex gap-3'>
        <div className='Emoji-Pickker'>
            <button onClick={handleEmojiPickerClick}>Smile</button>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} className="absolute" />}
        </div>

        <form onSubmit={(e)=> sendChat(e)}>
            <input type='text' className='px-5 py-2 mt-2 my-3 outline-none text-gray-700 rounded-md bg-gray-200 p-2 w-full' placeholder='Type a message...' onChange={handleChange} value={message}/>
            <div>
                <button type='submit'>Send</button>
            </div>

        </form>

    </div>
  )
}
