import React from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Voice() {
    const startListening=()=>{ return SpeechRecognition.startListening({continuous:true,language:'en-IN'})};
    const {
        transcript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
  return (
    <div className='mt-20 flex w-full h-full justify-center items-center'>
        <h1>A news Voice</h1>
        <div className='w-full h-full'>
      <p className='border-2 w-full h-1/2'>My transcript { transcript}</p>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      <button className='mx-2' onClick={startListening}>Start</button>
      <button className='mx-2' onClick={SpeechRecognition.stopListening}>Stop</button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
    </div>
    </div>
  )
}

export default Voice