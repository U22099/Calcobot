import { useState, useEffect, useRef } from 'react'
import { useCamera } from "./custom-hooks/useCamera";
function App() {
  const { image, stream, error, captureImage,requestCamera } = useCamera();
  const vid = useRef();
  
  useEffect(() => {
    requestCamera();
  }, []);
  useEffect(() => {
    if(stream && vid.current){
      vid.current.srcObject = stream;
    }
  }, [stream, vid.current]);
  return (
    <div className="p-5 w-[90vw] h-full flex flex-col gap-3 mx-auto mt-10">
      <video ref={vid} muted autoPlay/>
      <button className="border-slate-300 border-2 shadow-md text-[gold] bg-blue" onClick={() => {
        captureImage();
      }}> Capture Image</button>
      {image && <img src={image}/>}
      {error && <p>An error occured</p>}
    </div>
  )
}

export default App
