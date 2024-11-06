import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useCamera } from "../custom-hooks/useCamera";
import { FaCamera } from "react-icons/fa6";
import { useData } from "../store";

function Camera() {
  const { image, stream, error, captureImage, requestCamera } = useCamera();
  const setData = useData(state => state.setData);
  const navigate = useNavigate();
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
  useEffect(() => {
    if(image){
      setData(image);
      navigate("/result");
    }
  }, [image]);
  return (
    <>
      <div className="p-5 w-full min-h-[100vh] flex flex-col gap-4 mx-auto py-5 bg-black">
        <video ref={vid} playsInline={true} webkit-playsinline={true} className="rounded-md p-1 border-2 border-white h-[75vh]"/>
        <div className="bg-white fill-black font-bold p-6 rounded-full shadow-sm active:shadow-none active:scale-95 mx-auto text-2xl" onClick={() => captureImage()}>
          <FaCamera/>
        </div>
      </div>
      {initVid && <InitButton error={error} start={startCam}  show={show}/>}
    </>
  )
}

const InitButton = ({ error, start, show }) => {
  return(
   <div className="fixed h-full w-full top-0 flex justify-center items-center bg-black flex flex-col gap-2">
     <section className="flex flex-col gap-2 text-center mx-auto justify-start items-center text-white">
       <img src="logo.svg"/>
       <header>Calcobot</header>
       <p>AI Maths and Calculus Solver</p>
     </section>
     {(show&&!error) && <button className="bg-white text-black text-xl font-bold p-2 rounded-lg shadow-sm active:shadow-none active:scale-95 animate-scale-in" onClick={async () => await start()}>Start App</button>}
     {error && <p className="text-red-600">Permission Denied</p>}
   </div> 
  )
}

export default Camera