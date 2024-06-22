import React from 'react'
import Camera from '../components/shared/Camera.jsx'
function Home() {
  // const [webcam, setWebcan] = React.useState(false);
  // const [imgSrc, setImgSrc] = React.useState(null);
  const webcamRef = React.useRef(null);
  function capture() {
    setWebcan(false)
    console.log(webcamRef.current);
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImgSrc(imageSrc);
  }
  return (
    <>
    <div className='main flex items-center flex-col h-screen pt-16'>
      <h1 className='text-5xl font-bold  my-4'>Snap a picture</h1>
      {/* Webcam */}
      <Camera/>
    </div>
    </>
  )
}

export default Home