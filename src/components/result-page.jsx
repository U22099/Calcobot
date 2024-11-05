import { useState } from "react";
import Image from "./result-components/image-submit-page";
import Solution from "./result-components/solution";

export default function ResultPage(){
  const [ showSolution, setShowSolution ] = useState(false);
  const [ solution, setSolution ] = useState("");
  return(
    <div>
      {showSolution ? <Solution solution={solution} /> : <Image setShowSolution={setShowSolution} setSolution={setSolution} />}
    </div>
  )
}