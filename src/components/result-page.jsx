import { useState } from "react";
import Image from "./result-components/image-submit-page";
import Solution from "./result-components/solution";

export default function ResultPage(){
  const [ showSolution, setShowSolution ] = useState(false);
  return(
    <div>
      {showSolution ? <Solution setShowSolution={setShowSolution} /> : <Image setShowSolution={setShowSolution} />}
    </div>
  )
}