import { useState, useEffect, useRef } from 'react'
import { useCamera } from "../custom-hooks/useCamera";

function Camera() {
  const { image, stream, error, captureImage, requestCamera } = useCamera();
  const [ initVid, setInitVid ] = useState(true);
  const vid = useRef();
  
  const startCam = async () => {
    if (stream && vid.current) {
      const video = vid.current; 
      video.srcObject = stream;
      video.muted = true;
      video.play();
      setInitVid(false);
    }
  }

  useEffect(() => {
    requestCamera();
  }, []);
  useEffect(() => {
    if (stream && vid.current) {
      
    }
  }, [stream, vid.current]);
  return (
    <>
    <div className="p-5 w-[90vw] h-full flex flex-col gap-3 mx-auto mt-10 bg-black">
      <video ref={vid} playsInline webkit-playsinline className="object-cover"/>
      <button className="bg-cyan-600 shadow-lg text-[gold] p-4 rounded-lg font-bold shadow-emerald-400  active:shadow-none" onClick={() => captureImage()}> Capture Image</button>
      {image && <img src={image}/>}
      {error && <p className="text-red-600">An error occured</p>}
    </div>
    {initVid && <InitButton start={startCam} />}
    </>
  )
}

const InitButton = ({ start }) => {
  return(
   <div className="fixed h-full w-full top-0 flex justify-center items-center bg-black">
     <button className="bg-cyan-600 shadow-lg text-[gold] p-4 rounded-lg font-bold shadow-emerald-500 active:shadow-none" onClick={async () => await start()}>Start Camera</button>
   </div> 
  )
}

export default Camera