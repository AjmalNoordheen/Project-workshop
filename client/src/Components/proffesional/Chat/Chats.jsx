import React, { useEffect, useRef, useState } from "react";
import AxiosInstance from "../../../Axios/proAxios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { NavBar } from "../NavBar/NavBar";

function Chats({}) {
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  // const [chat, setChat] = useState('true')
  const [chatList, setChatList] = useState();
  const [Id, setChatId] = useState(null);
  const [chatId, setChatIdd] = useState(null);

  const email = useSelector((store) => store.Proffessional.email);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const messageHolder = useRef(null);

  const userType = "proffesional";
  const proAxios = AxiosInstance();
  const UserDataEmail = useSelector((store) => store.Proffessional.email);
  const userData = useSelector((store) => store.Proffessional.proData);
  useEffect(() => {
    proAxios
      .get(`/loadProChat?id=${Id}`)
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
  }, [Id]);

  // useEffect(() => {
  //     setUserId(userData);
  //   }, [userData]);

  useEffect(() => {
    proAxios.get(`/listChat?email=${email}`).then((res) => {
      setChatList(res.data.list);
    });
  }, []);

  const sendMessage = async () => {
    console.log(message.length);

    if (message.length > 0) {
      const res = await proAxios.post("/addProMessage", {
        message,
        chatId,
        UserDataEmail,
        userType,
      });
      if (res) {
        let newMessage = {
          text: message,
          senderType: userType,
          senderId: userData._id,
          timestamp: Date.now(),
        };
        setMessages(res.data.messages);
        setMessage("");
        socket.emit("newMessage", newMessage, Id);
      }
    }
  };

  //===============================
  useEffect(() => {
    const newSocket = io("http://localhost:3000/chat");
    setSocket(newSocket);
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [Id]);

  useEffect(() => {
    if (socket) {
      socket.emit("setup", Id);
      socket.on("messageResponse", (message, receivedChatId) => {
        if (Id === receivedChatId) {
          if (message.senderId != userData._id) {
            setMessages((prevMessages) => [...prevMessages, message]);
          }
        }
      });
    }
  }, [socket]);

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
        <div className="w-5/12 h-[92%] flex justify-center items-center rounded-lg bg-gray-300 ml-2 ">
          <div className="h-[90%]  overflow-scroll w-[96%]  bg-gray-200">
			<p className="m-2 font-bold">Chats</p>
            {chatList ? (
              chatList.map((list) => {
                return (
                  <div
                    onClick={() => {
                      setChatId(list._id);
                      setChatIdd(list._id);
                      setMessages(list.messages);
                    }}
                    className="m-1 bg-white h-[20%]  flex items-center"
                  >
                    <img
                      src={list?.user?.image}
                      className="h-[50%] rounded-full  md:block w-[10%] ml-[1%]"
                      alt=""
                    />
                    <div className="overflow-hidden ml-3 h-[60%]  w-full">
                      <h1 className="font-bold">{list?.user?.name}</h1>
                      <small className="w-[100%]">
                        {list.messages
                          ? list.messages[list.messages.length - 1]
                            ? list.messages[list.messages.length - 1].text
                            : ""
                          : ""}
                      </small>
                    </div>
                    <div className="md:mr-[2%] text-end w-full flex-col h-full">
                      <p className="text-xs">
                        {list.messages &&
                        list.messages[list.messages.length - 1] &&
                        
                           new Date(
                              list.messages[list.messages.length - 1].timestamp
                            ).toLocaleDateString()
                           }
                      </p>{" "}
                      {/* <div className="border mt-[50%]  rounded-full w-[40%] text-center text-xs font-bold bg-green-600 text-white h-[26%]">
												1
											</div> */}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h1>no list</h1>{" "}
              </div>
            )}
          </div>
          <button className="bg-black px-4 sm:hidden text-white hover:bg-white hover:text-black py-2 rounded-md">
            Back
          </button>
        </div>
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
                          {message?.senderId == userData._id ? (
                            <div className="col-start-7 col-end-13 p-3 rounded-lg">
                              <div className="flex items-center justify-start flex-row-reverse">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  <img
                                    src={"/profileimage.png"}
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
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-start-1 col-end-7 p-3 rounded-lg">
                              <div className="flex flex-row items-center">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
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
