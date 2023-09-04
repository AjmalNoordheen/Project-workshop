import React from 'react'

const ChatList = ({chatList, setReceiver,type}) => {
  return (
    <div className="w-5/12 h-[92%] flex justify-center items-center rounded-lg bg-gray-300 ml-2 ">
          <div className="h-[90%]  overflow-scroll w-[96%]  bg-gray-200">
			<p className="m-2 font-bold">Chats</p>
            { chatList ? (
                
                chatList.map((list) => {
                return (
                    
                  <div
                    onClick={() => {
                      setReceiver(list._id)
                    }}
                    className="m-1 bg-white h-[20%]  flex items-center"
                  >
                    <img
                      src={type=='professional' ? list?.user?.image : list.professional.image}
                      className="h-[50%] rounded-full  md:block w-[10%] ml-[1%]"
                      alt=""
                    />
                    <div className="overflow-hidden ml-3 h-[60%]  w-full">
                      <h1 className="font-bold">{type=='professional' ?list?.user?.name : list.professional.name}</h1>
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
  )
}

export default ChatList