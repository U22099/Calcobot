import { useState, useEffect, useRef } from 'react'
import { useCamera } from "./custom-hooks/useCamera";
function App() {
  const { image, stream, error, captureImage,requestCamera } = useCamera();
  const vid = useRef();
  
  useEffect(() => {
    requestCamera();
  });
  useEffect(() => {
    if(stream && vid.current){
      vid.current.srcObject = stream;
    }
  }, [stream, vid.current]);
  useEffect(() => {
    if(error){
      console.log(error);
    }
  }, [error]);
  return (
    <>
      <video ref={vid} muted autoPlay/>
      <button onClick={() => captureImage()}> Capture Image</button>
      {image && <img src={image}/>}
      {error && <p>An error occured</p>}
    </>
  )
}

export default App
