import React, { useEffect, useRef, useState } from "react";
import AxiosInstance from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function Chat({ fun, id }) {
	const [inputMessage, setInputMessage] = useState("");
	const [socket, setSocket] = useState(null);
	const [chat, setChat] = useState(null);
	const [chatId, setChatId] = useState(null);
	const email = useSelector((store) => store.Client.email);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState();
	const messageHolder = useRef(null);
	const UserDataEmail = useSelector((store) => store.Client.email);
	const userType = "user";
	const userAxios = AxiosInstance();
	const userData = useSelector((store) => store.Client.userData);
	console.log(UserDataEmail);

	useEffect(() => {
		const newSocket = io("http://localhost:3000/chat");
		setSocket(newSocket);
		return () => {
			if (newSocket) newSocket.disconnect();
		};
	}, [chatId]);

	useEffect(() => {
		if (socket) {
			socket.emit("setup", chatId);
			socket.on("messageResponse", (message, receivedChatId) => {
				if (chatId === receivedChatId) {
					if (message.senderId != userData._id)
						setMessages((prevMessages) => [...prevMessages, message]);
				}
			});
		}
	}, [socket]);

	useEffect(() => {
		if (messageHolder.current)
			messageHolder.current.scrollTop = messageHolder.current.scrollHeight;
	}, [messages]);

	useEffect(() => {
		userAxios
			.get(
				`/loadChat?email=${email}&proId=${id}&type=${userType}&id=${userData._id}`
			)
			.then((res) => {
				if (res) {
					setChat(res.data.chat);
					setChatId(res.data.chat._id);
					setMessages(res.data.chat.messages);
				} else {
					console.log(error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// console.log(UserData);
	//     useEffect(() => {
	//         setUserId(UserData);
	//       }, [UserData]);

	const sendMessage = async () => {
		try {
			const chatId = chat._id;
			if (message.length > 0) {
				const res = await userAxios.post("/addMessage", {
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
					setMessage("");
					setMessages(res.data.messages);
					socket.emit("newMessage", newMessage, chatId);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="flex h-screen full antialiased justify-center items-center text-gray-800">
				<div className="sm:flex sm:flex-row h-full w-10/12 overflow-x-hidden">
					<div className="flex flex-col flex-auto h-full p-6 ">
						<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
							<div
								className="flex flex-col h-full overflow-x-auto mb-4"
								ref={messageHolder}
							>
								<span className="cursor-pointer fixed" onClick={() => fun(1)}>
									<i class="fa-solid fa-arrow-left"></i>
								</span>

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
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														sendMessage();
													}
												}}
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

export default Chat;