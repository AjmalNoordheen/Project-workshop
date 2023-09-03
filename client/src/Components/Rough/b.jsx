import React, { useEffect, useRef, useState } from 'react';
import  AxiosInstance  from '../../../Axios/proAxios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

function Chats({}) {
    const [inputMessage,setInputMessage] = useState('')
    const [socket,setSocket] = useState(null)
    const [chat, setChat] = useState('true')
    const [chatList,setChatList] =useState()
    const [Id, setChatId] = useState(null)
    const [chatId, setChatIdd] = useState(null)

    const email = useSelector(store=>store.Proffessional.email)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const messageHolder = useRef(null)

    const userType = 'proffesional'
    const proAxios = AxiosInstance()
    const UserDataEmail = useSelector((store)=>store.Proffessional.email)
    const UserData = useSelector((store)=>store.Proffessional.proData)

    console.log(UserData,'hgjgjgjgjgjgjgjgjgjgj');
    useEffect(()=>{
      proAxios.get(`/loadProChat?id=${Id}`).then((res)=>{
            if(res){
                console.log(res, '0000000000000000000')
                setMessages(res.data.messages)
                }else{
                    console.log(error)
                }
         }).catch((error)=>{
            console.log(error);
         })
            
        
    },[Id])

    console.log(Id, '99999999999999999999999999999');
    // useEffect(() => {
    //     setUserId(UserData);
    //   }, [UserData]);

      useEffect(()=>{
        proAxios.get(`/listChat?email=${email}`).then((res)=>{
          console.log(res.data.list);
          setChatList(res.data.list)
        })
      },[])

      
      const sendMessage = async () => {

        console.log(message.length)
        
        if(message.length > 0){
         const res = await proAxios.post('/addProMessage',{message, chatId, UserDataEmail, userType})
         if(res){ 
          console.log(res, 'llllllllllllllllll');
          let newMessage = {text:message,senderType:userType,senderId:UserData._id}
          console.log(res.data, '==========yfttyuu================')
          setMessage('')
          setMessages(res.data.messages)
          socket.emit('newMessage',newMessage, Id)
         }
        }
        try {
          console.log(inputMessage);
      } catch (error) {
          
      }
    }

  //===============================
  useEffect(()=>{
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)
    return ()=>{
        if(newSocket)
        newSocket.disconnect()
    }
},[Id])

useEffect(()=>{
    if(socket){
        socket.emit('setup', (Id))
        socket.on("messageResponse",(message,receviedChatId) => {
            if(Id===receviedChatId){
                setMessages((prevMessages)=> [...prevMessages,message])
            }
        })
    }

},[socket])

useEffect(()=>{
    if(messageHolder.current)
        messageHolder.current.scrollTop = messageHolder.current.scrollHeight
},[messages])


  return (
    <div >
    {/* <div className='w-4/12 h-screen flex justify-center items-center bg-black'> */}
    <div className="flex h-screen full antialiased justify-center items-center text-gray-800">
        <div className='w-5/12 h-[92%] rounded-lg bg-red-800 ml-2 '>
            <h1 className='text-xl m-[3%]'>Chats</h1>
            <div className='h-5/6  overflow-scroll w-full  bg-slate-500'>
                {chatList ? chatList.map((list) => {
                    return (<div
                        onClick={() => {
                            setChatId(list._id)
                            setChatIdd(list._id)
                            setMessages(list.messages)
                        }}
                        className='m-1 bg-blue-300 h-32  flex items-center'>
                        <img src="" className='h-[70%] object-contain  md:block w-[10%] ml-[1%]' alt="" />
                        <div className='overflow-hidden ml-1 h-[60%]  w-100'>
                            <h1>{list?.user?.name}</h1>
                            <small className='w-[100%]  '>Hioimamnsjhsdkhfsuyuiyj'
                                oioiuoiuoiuoiu h jhkjhjhkghyhguyyyyyyyyyyyyyyyygyugyugyugyugyugyugyugyugyugyugyugyu</small>
                        </div>
                        <div className='md:mr-[2%] flex-col h-full'>
                            <p className='text-xs '>Yesterday</p>
                            <div className='border mt-[50%]  rounded-full w-[40%] text-center text-xs font-bold bg-green-600 text-white h-[26%]'>1</div>

                        </div>
                    </div>)
                }) : <div><h1>no list</h1> </div>}


            </div>
            <button className='bg-black px-4 sm:hidden text-white hover:bg-white hover:text-black py-2 rounded-md'>Back</button>
        </div>
        {/* </div> */}
        <div className="sm:flex sm:flex-row h-full w-11/12 overflow-x-hidden">

            <div className="flex flex-col flex-auto h-full p-6 ">


                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-full p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">

                        <div className="flex flex-col h-full">

                            <div className="grid grid-cols-12 gap-y-2">
                                <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                    <div className="flex items-center justify-start flex-row-reverse">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                            <img
                                                src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                alt="Avatar"
                                                className="h-full w-full rounded-full"
                                            />
                                        </div>
                                        <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                            <div className='break-words'>hi</div>
                                            <small className="text-xs text-gray-400">date
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                {messages ? messages.map((message) => {
                                    return (<div className="col-start-1 col-end-7 p-3 rounded-lg">
                                        <div key={message._id} className="flex flex-row items-center">
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                <img
                                                    src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
                                                    alt="Avatar"
                                                    className="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <div className="relative mr-3 w-full text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                <div className='break-words'>{message.text}</div>
                                                <small className="text-xs text-gray-400"> </small>
                                            </div>
                                        </div>
                                    </div>)
                                }) : ''}

                                <div />
                            </div>


                        </div>

                    </div>

                    <div>
                        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        type="text"
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        placeholder="Type your message..."
                                    />
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    onClick={sendMessage}
                                    type='button'
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
