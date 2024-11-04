import { useEffect, useState } from "react";

export const useCamera = () => {
  const [ image, setImage ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ stream, setStream ] = useState(null);
  
  const requestCamera = async () => {
    try{
      const media = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "environment"
        }
      });
      setStream(media);
    } catch(err){
      setError(err);
    }
  }
  
  const captureImage = async () => {
    if(!stream) return;
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
    const photo = await imageCapture.takePhoto();
    const base64Img = await convert_to_base_64(photo);
    setImage(base64Img);
  }
  
  const convert_to_base_64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    })
  }
  
  useEffect(() => {
    return () => {
      if(stream){
        stream.getTracks().forEach(track => track.stop());
      }
    }
  },[stream]);
  
  return {
    stream,
    image,
    error,
    captureImage,
    requestCamera
  }
}