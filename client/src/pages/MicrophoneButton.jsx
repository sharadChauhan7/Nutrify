import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { motion, useAnimation } from "framer-motion";
import { ElevenLabsClient, play } from "elevenlabs";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import axios from 'axios';

const MicrophoneButton = () => {
    const controls = useAnimation();
    const [power, setPower] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const { listening, transcript, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        if (listening || isPlaying) {
            const interval = setInterval(() => {
                const randomPower = Math.random() * 2 + 1;
                setPower(transcript);
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
                setPower("");
            }
            controls.start({ scale: 1, borderWidth: "2px" });
        }
    }, [listening, controls,isPlaying]);
    console.log(isPlaying);

    async function sendApi(text) {
        // Triger API 
        console.log(text);
        resetTranscript();

        // url / fun text
        const response = await axios.post('http://127.0.0.1:5000/analyze_query', { query: text });
        console.log(response.data.response);


        const demores = "I'm sorry to hear that you're not feeling well. High neutrophil levels can indicate an infection or inflammation, and a headache might be a symptom of various conditions. It's crucial to stay hydrated and rest. However, it's important to consult a healthcare professional for proper evaluation and treatment. In the meantime, avoid any known triggers and maintain a light, easily digestible diet. Feel better soon! 🙏🏽🍵";
        texttospeech(response.data.response);

    }
    const client = new ElevenLabsClient({
        apiKey: import.meta.env.VITE_ELEVEN_API_KEY,
    });

    const [audioSrc, setAudioSrc] = React.useState("");
    const texttospeech = async (text) => {
        console.log(text);
        setAudioSrc("")
        let audioBase64 = await createAudioStreamFromText(text);
        setAudioSrc(`data:audio/mp3;base64,${audioBase64}`)
        // await play(audio);
        console.log("Audion played");
    }

    const createAudioStreamFromText = async (text) => {
        const audioStream = await client.generate({
            voice: 'Bella',
            model_id: 'eleven_turbo_v2_5',
            text,
        });
        // Convert

        // Convert buffer to Base64 and send it

        // Streame

        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }

        const audioBuffer = Buffer.concat(chunks);
        const audioBase64 = audioBuffer.toString('base64');
        return audioBase64;
    };

    // Chat Bot 
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "AI", text: "Hi, how can I help you today?" },
        { sender: "You", text: "I have a headache and high neutrophil levels" },
        { sender: "AI", text: "I'm sorry to hear that you're not feeling well. High neutrophil levels can indicate an infection or inflammation, and a headache might be a symptom of various conditions. It's crucial to stay hydrated and rest. However, it's important to consult a healthcare professional for proper evaluation and treatment. In the meantime, avoid any known triggers and maintain a light, easily digestible diet. Feel better soon! 🙏🏽🍵" },
        { sender: "You", text: "I have a headache and high neutrophil levels" },
        { sender: "AI", text: "I'm sorry to hear that you're not feeling well. High neutrophil levels can indicate an infection or inflammation, and a headache might be a symptom of various conditions. It's crucial to stay hydrated and rest. However, it's important to consult a healthcare professional for proper evaluation and treatment. In the meantime, avoid any known triggers and maintain a light, easily digestible diet. Feel better soon! 🙏🏽🍵" }
    ]);
    const [input, setInput] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { sender: "You", text: input }]);
        
        setInput("");
    };

    return (
        <>

            {/* <div className='h-screen w-full mt-10 flex justify-center items-center  overflow-auto gap-4 bg-slate-50 p-8'> */}
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
                    <div className="flex flex-col w-full items-center justify-center min-h-screen">
                        <motion.button
                            animate={controls}
                            className="w-40 h-40 flex items-center justify-center rounded-full border-4 border-gray-500 bg-black shadow-lg"
                            onClick={SpeechRecognition.startListening}
                        >
                            <span className="text-white text-3xl"><GraphicEqIcon sx={{fontSize:"6rem"}}/></span>
                        </motion.button>
                        {/* <p className="mt-4 text-gray text-2xl font-semibold">{transcript || "Click to start speaking"}</p> */}
                        {audioSrc && (
                            <audio controls autoPlay onPlay={() => setIsPlaying(true)} onEnded={() => setIsPlaying(false)} className='invisible'>
                                <source src={audioSrc} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>
                ) : (
                    <div className="   right-0 mr-4 bg-white p-6 rounded-lg border border-gray-200 w-[80%] h-[85%] shadow-md">
                        <div className="flex flex-col space-y-1.5 pb-6">
                            <h2 className="font-semibold text-lg">Nutrify AI</h2>
                            <p className="text-sm text-gray-500">Powered by Sharad and Subham</p>
                        </div>

                        <div className="pr-4 h-[474px] overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm">
                                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 bg-gray-100 border p-1 items-center justify-center">
                                        {msg.sender === "AI" ? (
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
                                        ) : (
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
                                        )}
                                    </span>
                                    {msg.sender === "AI" ? (<p className="leading-relaxed ">
                                        <span className="block font-bold text-gray-700">{msg.sender} </span>
                                        {msg.text}
                                    </p>) : (
                                        <p className="leading-relaxed bg-slate-200 w-full p-2 rounded-lg">
                                            <span className="block font-bold text-gray-700">{msg.sender} </span>
                                            {msg.text}
                                        </p>
                                    )}
                                </div>
                            ))}
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
                )}
            </div>
            {/* </div> */}

        </>
    );
};

export default MicrophoneButton;
