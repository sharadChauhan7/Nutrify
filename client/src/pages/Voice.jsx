import React from 'react'
import { ElevenLabsClient, play } from "elevenlabs";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, useAnimation } from "framer-motion";


function Voice() {
    const startListening=()=>{ return SpeechRecognition.startListening({continuous:true,language:'en-IN'})};
    const {
        transcript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
      

      // Text To Speech 

      const [audioSrc, setAudioSrc] = React.useState("");

      
      const client = new ElevenLabsClient({
        apiKey: import.meta.env.VITE_ELEVEN_API_KEY,
      });

      const texttospeech = async (text)=>{
        console.log(text);
        setAudioSrc("")
        let audioBase64 = await createAudioStreamFromText(text);
        setAudioSrc(`data:audio/mp3;base64,${audioBase64}`)
        // await play(audio);

        console.log("Audion played")
      }
      // New Fn

      const createAudioStreamFromText = async (text) => {
        const audioStream = await client.generate({
          voice: 'Rachel',
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

      // Text Record
      let [text,setText] = React.useState('');
      const handleChange = (e)=>{
        setText(e.target.value);
      }

  return (
    <div className='mt-20 flex w-full h-full justify-center items-center'>
        <h1>A news Voice</h1>
        <div className='w-full h-full'>
      <p className='border-2 w-full h-1/2'>My transcript { transcript}</p>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      <button className='mx-2' onClick={startListening}>Start</button>
      <button className='mx-2' onClick={SpeechRecognition.stopListening}>Stop</button>


      <textarea name="text" id="" className='w-full border-2 border-red-500' onChange={handleChange} ></textarea>
      <button onClick={()=>{texttospeech(text)}}>Get Text</button>
      {audioSrc && (
        <audio controls autoPlay className='invisible'>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* <button onClick={resetTranscript}>Reset</button> */}
    </div>
    </div>
  )
}

export default Voice