import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Microphone = () => {
  const { listening,transcript } = useSpeechRecognition();
  const controls = useAnimation();
  const [size, setSize] = useState(100);
  const [borderWidth, setBorderWidth] = useState(4);

  useEffect(() => {
    if (listening) {
      controls.start({
        scale: [1, 1.3, 1], // Smooth pulsing effect
        borderWidth: [4, 8, 4], // Dynamic border change
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
      });

      setSize(130);
      setBorderWidth(8);
    } else {
      controls.start({ scale: 1, borderWidth: 4, transition: { duration: 0.3 } });
      setSize(100);
      setBorderWidth(4);
    }
  }, [listening, controls]);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-900">
      <motion.div
        animate={controls}
        className="flex justify-center items-center rounded-full border-gray-300 bg-blue-500 shadow-lg"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${borderWidth}px`,
        }}
        onClick={SpeechRecognition.startListening}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="white"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v3m-4-3a4 4 0 008 0m4-6v2a8 8 0 11-16 0v-2m8 6a4 4 0 01-4-4V5a4 4 0 118 0v7a4 4 0 01-4 4z"
          />
        </svg>
      </motion.div>
      <div className="text-white">{transcript}</div>
    </div>
  );
};

export default Microphone;
