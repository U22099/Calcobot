import { useState, useEffect, useRef } from 'react'
import { useCamera } from "../custom-hooks/useCamera";
import { FaCamera } from "react-icons/fa6";

function Camera() {
  const { image, stream, error, captureImage, requestCamera } = useCamera();
  const [ initVid, setInitVid ] = useState(true);
  const vid = useRef();
  
  const [ show, setShow ] = useState(false);
  
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
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);
  return (
    <>
      <div className="p-5 w-full min-h-[100vh] flex flex-col gap-4 mx-auto py-5 bg-black">
        <video ref={vid} playsInline={true} webkit-playsinline={true} className="rounded-md p-1 border-2 border-white h-[75vh]"/>
        <div className="bg-white fill-black font-bold p-6 rounded-full shadow-sm active:shadow-none active:scale-95 mx-auto text-2xl" onClick={() => captureImage()}>
          <FaCamera/>
        </div>
        {error && <p className="text-red-600">An error occured</p>}
      </div>
      {initVid && <InitButton start={startCam}  show={show}/>}
    </>
  )
}

const InitButton = ({ start, show }) => {
  return(
   <div className="fixed h-full w-full top-0 flex justify-center items-center bg-black">
     {show && <button className="bg-white text-black text-xl font-bold p-2 rounded-lg shadow-sm active:shadow-none active:scale-95 animate-scale-in" onClick={async () => await start()}>Start App</button>}
   </div> 
  )
}

export default Camera