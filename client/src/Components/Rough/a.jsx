
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import UserAxios from '../../../Axios/userAxios'
import { useSelector } from 'react-redux'



function Message() {
  const userAxios = UserAxios()

  const { id } = useParams();
  const [chat, setChat] = useState(true)
  const [userId, setUserId] = useState()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [profile1, setProfile1] = useState(null)
  const [profile2, setProfile2] = useState(null)

  const { UserData  , Token } = useSelector((state) => state.Client)
  useEffect(() => {
    setUserId(UserData._id);
  }, [UserData]);
  const navigate = useNavigate()



  useEffect(() => {
    let socket = io('http://localhost:3000')
    socket.emit('setup', userId)
    console.log('socket connecting');
    socket.on('connection')
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    userAxios.post('/loadChat', { id })
      .then((res) => {
        console.log(res.data.chat, '*************');
        setChat(res.data.chat)
        setMessages(res.data.chat.messages)

      })
  }, [])
  const sendMessage = () => {
    const chatId = chat._id
    if (message.length !== 0) {
      userAxios.post('/addMessage', { message, chatId })
        .then((res) => {

          setMessages(res.data.chat.messages)
          socket.emit('new message', message, chatId)
        })
    }
  }

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="sm:flex sm:flex-row h-full w-full overflow-x-hidden">

          <div className="flex flex-col flex-auto h-full p-6 ">
            <button className='bg-black px-4 sm:hidden text-white hover:bg-white hover:text-black py-2 rounded-md'>Back</button>

            {chat ?
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">

                  <div className="flex flex-col h-full">
                    {messages.map((message) => (
                      <div key={message._id} className="grid grid-cols-12 gap-y-2">
                        {(message?.sender?._id || message?.senderId) == userId ? <div className="col-start-7 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              <img
                                src={profile1 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                alt="Avatar"
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div className='break-words'>{message?.text}</div>
                              <small className="text-xs text-gray-400"> {new Date(message?.createdAt).toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                              })}</small>
                            </div>
                          </div>
                        </div> : <div className="col-start-1 col-end-7 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              <img
                                src={profile2 || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                alt="Avatar"
                                className="h-full w-full rounded-full"
                              />
                            </div>
                            <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div className='break-words'>{message?.text}</div>
                              <small className="text-xs text-gray-400"> {new Date(message?.createdAt).toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                              })}</small>
                            </div>
                          </div>
                        </div>}
                        <div />
                      </div>
                    ))}

                  </div>

                </div>

                <div>
                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          type="text"
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                          placeholder="Type your message..."
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => sendMessage()}
                        type='button'
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      >
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              : <div className='flex justify-center h-screen '><h1 className='self-center text-3xl'>Select any message!!</h1></div>}

          </div>
        </div>
      </div>
    </>
  )
}

export default Message