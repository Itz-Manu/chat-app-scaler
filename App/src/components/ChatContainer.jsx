import React from 'react'
import Logout from './Logout'
import Input from './layout/Input'

export default function ChatContainer({ currentChat }) {
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

                        </div>

                        <div className='chat-input bg-slate-600 px-3'>
                            <Input type='text' placeholder='Type a message...' />
                        </div>
                    </div>
                )
            }
        </>
    )
}
