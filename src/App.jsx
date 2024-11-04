import { useState, useEffect } from 'react'
import { useCamera } from "./custom-hooks/useCamera";
function App() {
  const { image, stream, error, captureImage,requestCamera } = useCamera();
  
  useEffect(() => {
    requestCamera();
  })
  return (
    <>
      <p>Hello World</p>
      <video muted autoplay src={stream} />
    </>
  )
}

export default App
