import React, { useEffect, useRef, useState } from "react";
import proInstance from "../../../Axios/proAxios";
import userInstance from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { NavBar } from "../../proffesional/NavBar/NavBar";
import ChatList from "./ChatList";
import { useLocation } from "react-router-dom";

function Chats({pro,fun}) {
  const [socket, setSocket] = useState(null);
  // const [chat, setChat] = useState('true')
  
  const proAxios = proInstance();
  const userAxios = userInstance();
  
  const [chatList, setChatList] = useState(null);
  const [receiver, setReceiver] = useState(null)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [timeStamp, setTimeStamp] = useState(Date.now());
  
  const [showMes,setShowMes] = useState('')

  const messageHolder = useRef(null);

  const location = useLocation()
  const senderType = location.pathname.includes('proffesional') ? 'professional' : 'user'

  const senderData = useSelector((store) => senderType === 'professional' ?   store.Proffessional.proData : store.Client.userData);
  
  const Axios=senderType === 'professional'?proAxios:userAxios

  useEffect(() => {
      Axios.get(`/listChat?id=${senderData._id}&senderType=${senderType}&proId=${pro}`).then((res) => {
        setChatList(res.data.list);
      });
    
  }, []);

  useEffect(() => {
    const newSocket = io("https://api.motormenders.online/chat");
    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [receiver]);

  useEffect(() => {
    if (socket) {
      socket.emit("setup", receiver);
      socket.emit('read',timeStamp,receiver,senderData._id)
      socket.on("messageResponse", (message, receivedChatId) => {
       if(message){
        setShowMes(message)
       }
        if (receiver === receivedChatId) {
            setMessages((prevMessages) => [...prevMessages, message]);
            socket.emit('read',Date.now(),receiver,senderData._id)

        }
      });
      socket.on('readResponse',(timestamp,chatId,senderId)=>{
        if (receiver === chatId) {
          if(senderId != senderData._id)
          setTimeStamp(timestamp)
        }
      })
    }
  }, [socket]);

  useEffect(() => {
   Axios.get(`/fetchMessages?id=${receiver}`)
      .then((res) => {   
        if (res) {
          setMessages(res.data.messages);
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [receiver]);


  const sendMessage = async () => {
    console.log(message.length);

    if (message.length > 0) {
      let newMessage = {
        text: message,
        senderType,
        senderId: senderData._id,
        receiver,
        timestamp: Date.now(),
      };
        setMessage("");
        socket.emit("newMessage", newMessage, receiver);
      }
    }

  useEffect(() => {
    if (messageHolder.current)
      messageHolder.current.scrollTop = messageHolder.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      {/* <div className='w-4/12 h-screen flex justify-center items-center bg-black'> */}
          {/* <h1 className="text-xl m-[3%]">Chats</h1> */}
		  <NavBar/>
      <div className="flex h-screen full antialiased justify-center items-center text-gray-800">
        <ChatList chatList={chatList} show={showMes} setReceiver={setReceiver} timeStamp={new Date(timeStamp)} type={senderType} />
        {/* </div> */}
        <div className="sm:flex sm:flex-row h-full w-11/12 overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6 ">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-full p-4">
              <div
                className="flex flex-col h-full overflow-x-auto mb-4"
                ref={messageHolder}
              >
                <div className="flex flex-col h-full ">
                  {messages.length > 0
                    ? messages.map((message) => (
                        <div
                          key={message._id}
                          className="grid grid-cols-12 gap-y-2"
                        >
                          {message?.senderId == senderData._id ? (
                            <div className="col-start-7 col-end-13 p-3 rounded-lg">
                              <div className="flex items-center justify-start flex-row-reverse">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  <img
                                    src={senderData.image}
                                    alt="Avatar"
                                    className="h-full w-full rounded-full"
                                  />
                                </div>
                                <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                  <div className="break-words">
                                    {message ? message.text : ""}
                                  </div>
                                  <small className="text-xs text-gray-400">
                                    {" "}
                                    {new Date(
                                      message?.timestamp
                                    ).toLocaleString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })}
                                  </small>
                                  <small>{new Date(message.timestamp) < new Date(timeStamp) ? 'read' : 'unread'}</small>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-start-1 col-end-7 p-3 rounded-lg">
                              <div className="flex flex-row items-center">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  {console.log(message)}
                                  <img
                                    src={"/profileimage.png"}
                                    alt="Avatar"
                                    className="h-full w-full rounded-full"
                                  />
                                </div>
                                <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                  <div className="break-words">
                                    {message?.text}
                                  </div>
                                  <small className="text-xs text-gray-400">
                                    {" "}
                                    {new Date(
                                      message?.timestamp
                                    ).toLocaleString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })}
                                  </small>
                                </div>
                              </div>
                            </div>
                          )}
                          <div />
                        </div>
                      ))
                    : ""}
                </div>
                <div />
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
                      onClick={sendMessage}
                      type="button"
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
