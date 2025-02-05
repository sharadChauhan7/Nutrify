import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { motion, useAnimation } from "framer-motion";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { Link, useParams } from "react-router-dom";
import { texttospeech } from '../util/voiceUtil';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "sonner";

const Voice = () => {
    const controls = useAnimation();
    const navigate = useNavigate();
    // const [power, setPower] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ aiResponse: "I am ready ......", userMessage: "Type Your response here" }]);
    const [prevChats, setPrevChats] = useState(['Chat1', 'Chat2', 'Chat3']);
    const [input, setInput] = useState("");
    const [audioSrc, setAudioSrc] = React.useState("");
    const { listening, transcript, resetTranscript } = useSpeechRecognition();

    let { id } = useParams();
    useEffect(() => {
        
        if (listening || isPlaying) {
            const interval = setInterval(() => {
                const randomPower = Math.random() * 2 + 1;
                controls.start({
                    scale: 1 + randomPower * 0.2,
                    borderWidth: `${2 + randomPower * 2}px`,
                    transition: { duration: 0.2 },
                });
            }, 200);

            return () => clearInterval(interval);
        } else {
            if (transcript) {
                sendApi(transcript);
            }
            controls.start({ scale: 1, borderWidth: "2px" });
        }
        async function getChatData() {
            // Get id from params
            
            let res = await axios.get(`${import.meta.env.VITE_SERVER_URL}userChats/getIds`, {
                withCredentials: true
            });
            setPrevChats(res.data);
            
            if (id) {
                let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}userChats/${id}`, {
                    withCredentials: true
                });
                
                let messages = response.data.messages;
                setMessages((prev)=>messages);
            }
            else{
                setMessages((prev)=>[{ aiResponse: "I am ready ......", userMessage: "Type Your response here" }])
            }
        }
        getChatData();
    }, [listening, controls, isPlaying,id]);


    async function updateWeight(value){
        
        try{
          const newWeight = value;
          const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}dashboard/updateUserWeight`,{newWeight},{
            withCredentials:true
          });
    
         
          toast.success(res.data);
          
        }
        catch(err){
          console.log(err);
          toast.error("Error in updation");
        }
      }
      async function checkWeight(response){
        const weightUpdatePattern = /^Weight_update\s*=\s*(\d+)/i; // Added 'i' flag for case-insensitivity and allowed spaces around '='
        const match = response.match(weightUpdatePattern);
        let updatedResponse = response;
        if (match) {
            const weightValue = match[1]; // Extract the weight value
            updatedResponse = response.replace(weightUpdatePattern, '').trim();
            updateWeight(weightValue);
        }
        return updatedResponse;
      }
    async function sendApi(text) {
        // Triger API 
        resetTranscript();
        // url / fun text
        const response = await axios.post('http://127.0.0.1:5000/analyze_query', { query: text });
        
        const updatedResponse = await checkWeight(response.data.response);
        setAudioSrc("");
        const audioBase64 = await texttospeech(updatedResponse);
        setAudioSrc(`data:audio/mp3;base64,${audioBase64}`); // Call the updateWeight function with the extracted value
    }
    // Chat Bot 

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if(!id){
            setMessages((prev)=>[]);
        }

        setMessages((prev) => {
            return ([...prev, { userMessage: input,aiResponse:"Thinking..."}]);
        });
        let timestamps = {
            userSentAt: new Date(Date.now())
        }
        
        setInput("");
        const res = await axios.post('http://127.0.0.1:5000/analyze_query', { query: input });
        
        timestamps.aiRespondedAt = new Date(Date.now());
        
        res.data.response = await checkWeight(res.data.response);
        // Save Chat in Specific Id if thre or Create a specific id
        const saveChat = await axios.post(`${import.meta.env.VITE_SERVER_URL}userChats/${id}`, { userMessage: input, aiResponse: res.data.response, timestamps },
            {
                withCredentials: true
            }
        );

    
        setMessages((prev) => {
            let newMessages = [...prev];
            newMessages[newMessages.length - 1].aiResponse = res.data.response;
            return newMessages;
        });
        if(!id){
            navigate(`${saveChat.data.id}`);
        }

    };

    function handleDirection(id){
        navigate(`/voice/${id}`);
    }

    return (

        <>
            <div className=" pt-10 w-screen h-screen flex justify-center items-center bg-gray-200 ">
                <button
                    className="fixed bottom-4 right-4 flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 cursor-pointer border-gray-200 p-0"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    </svg>
                </button>

                {isOpen ? (
                    <div className="flex flex-col w-full  items-center justify-center min-h-screen">
                        <motion.button
                            animate={controls}
                            className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-gray-500 bg-black shadow-lg"
                            onClick={SpeechRecognition.startListening}
                        >
                            <span className="text-white text-3xl"><GraphicEqIcon sx={{ fontSize: "6rem" }} /></span>
                        </motion.button>
                        {/* <p className="mt-4 text-gray text-2xl font-semibold">{transcript || "Click to start speaking"}</p> */}
                        {audioSrc && (
                            <audio autoPlay onPlay={() => setIsPlaying(true)} onEnded={() => setIsPlaying(false)} className='invisible'>
                                <source src={audioSrc} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>
                ) : (
                    <div className=" right-0 mr-4 bg-white flex p-6 rounded-lg border border-gray-200 w-[90%] h-[85%] shadow-md">
                        <div className="w-[80%]">
                            <div className="flex flex-col space-y-1.5 pb-6">
                                <h2 className="font-semibold text-lg">Nutrify AI</h2>
                                <p className="text-sm text-gray-500">Powered by Sharad and Subham</p>
                            </div>

                            <div className="pr-4 h-[474px] overflow-y-auto">
                                {messages.map((msg, index) => {
                                    return (
                                        <div key={index}>
                                            <div  className="flex justify-end  gap-3 my-4 text-gray-600 text-sm">
                                                <p className="leading-relaxed text-right bg-slate-200 w-full p-2 rounded-lg ">
                                                    <span className="block font-bold  text-gray-700">You </span>
                                                    {msg.userMessage}
                                                </p>
                                                <span className="relative flex border-green-300 shrink-0 overflow-hidden rounded-full w-8 h-8 bg-gray-100 border p-1 items-center justify-center">
                                                    <svg
                                                        stroke="none"
                                                        fill="black"
                                                        strokeWidth="0"
                                                        viewBox="0 0 16 16"
                                                        height="20"
                                                        width="20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        <div  className="flex gap-3 my-4 text-gray-600 text-sm">
                                            <span className="relative flex border-green-300 shrink-0 overflow-hidden rounded-full w-8 h-8 bg-gray-100 border p-1 items-center justify-center">
                                                <svg
                                                    stroke="none"
                                                    fill="black"
                                                    strokeWidth="1.5"
                                                    viewBox="0 0 24 24"
                                                    height="20"
                                                    width="20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                                </svg>
                                            </span>
                                            <p className="leading-relaxed  bg-gray-100 w-full p-2 rounded-lg  ">
                                                <span className="block font-bold text-gray-700">AI </span>
                                                {msg.aiResponse}
                                            </p>
                                        </div>  
                                                        </div>

                                        )
                       
                                })}
                            </div>

                            <div className="flex items-center pt-2">
                                <form className="flex items-center w-full space-x-2" onSubmit={sendMessage}>
                                    <input
                                        className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-black"
                                        placeholder="Type your message"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white bg-black hover:bg-gray-900 h-10 px-4"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="border-2 rounded-2xl ml-2 shadow-xl w-[20%] p-2">
                            {/* User Previous Chats id */}
                            {/* <h1 className="text-2xl font-semibold text-center my-2 border-b-2 pb-2">Prev Chats</h1> */}
                            <div className="flex-col items-center justify-center">
                                {/* Button similar to chatgpt to create a new chat */}
                                <button onClick={()=>{handleDirection('')}} className="w-full  rounded-2xl p-1 text-xl bg-white font-bold hover:bg-gray-100 py-2    ">New Chat</button>
                                {/* Map previous chats */}
                                {prevChats.map((chat, index) => (
                                    
                                        <button key={index} onClick={()=>{handleDirection(chat.id)}} className="w-full rounded-2xl p-1 2 py-2 hover:bg-gray-100 text-xl bg-white font-bold   "> Nutrify talks 00{index+1}</button>
                                        // <Link className="w-full  rounded-2xl p-1 2 py-2 hover:bg-gray-100 text-xl bg-white font-bold " to = {`/voice/${chat.id}`}>{chat.id}</Link>
                                    
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {/* </div> */}

        </>
    );
};

export default Voice;
