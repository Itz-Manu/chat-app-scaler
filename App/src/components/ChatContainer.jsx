import React, { useEffect, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser }) {

    const [messages, setMessages] = useState([]);

    console.log(currentUser);

   const handelSendMsg = async (msg) => {
    console.log(currentUser._id, currentChat._id);
        try {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
                isAvatar: currentUser.isAvatar,
                avatar: currentUser.avatar,
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchMessages = async () => {
        console.log(currentUser._id, currentChat._id);
        try {
            const response = await axios.post(getMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            console.log(response);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        if (currentChat) {
            fetchMessages();
        }
    }, [currentChat, currentUser]);

    console.log(messages);


    return (
        <>
            {
                currentChat && (
                    <div className='flex flex-col gap-10'>
                        {/* Chat header, description who are you talking too */}
                        <div className=' flex items-center justify-between p-3 bg-gray-300 rounded-lg '>
                            <div className='flex items-center'>
                                <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt='user' className='w-10 h-10 rounded-full' />
                                <p className='ml-2'>{currentChat.firstname}</p>
                            </div>
                            <Logout />
                        </div>
    
                        {/* Chat messages */}
                        <div className='chat-message'>
                           {
                                 messages.length > 0 && messages.map((msg, index) => (
                                      <div key={index} className={`message ${msg.fromSelf} ? "sended" : recieved`}>
                                            <div className='flex gap-3'>
                                                <div className='flex items-center'>
                                                    <img src={`data:image/svg+xml;base64,${msg.avatar}`} alt='user' className='w-10 h-10 rounded-full' />
                                                    {/* <p className='ml-2'>{msg.from.firstname}</p> */}
                                                </div>
                                                <p className='text-gray-500'>{msg.createdAt}</p>
                                            </div>
                                            <p className='text-gray-800'>{msg.message}</p>
                                      </div>
                                 ))
                           }
                        </div>

                        <div className='chat-input bg-slate-600 px-3'>
                          <ChatInput handelSendMsg={handelSendMsg}/>
                        </div>
                    </div>
                )
            }
        </>
    )
}
