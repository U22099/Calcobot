import { useData } from "../../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { getMathsSolution } from "../../utils/getMathsSolution";

export default function Image({ setShowSolution, setSolution }){
  const navigate = useNavigate();
  const data = useData(state => state.data);
  const [ loading, setLoading ] = useState();
  const fetch = async () => {
    setLoading(true);
    const solution = await getMathsSolution();
    setSolution(solution);
    setShowSolution(true);
  }
  
  return(
    <div className="p-5 w-full min-h-[100vh] flex flex-col gap-4 mx-auto py-5 bg-black">
      <img src={data} className="rounded-md p-1 border-2 border-white h-[75vh]"/>
      <div className="flex gap-2 justify-between items-center w-full">
        <button className="flex justify-center items-center text-center bg-white text-black fill-black font-bold py-2 px-4 rounded shadow-sm active:shadow-none active:scale-95 mx-auto text-lg w-full" onClick={() => navigate("/")}>Retake</button>
        <button className="flex justify-center items-center text-center bg-white text-black fill-black font-bold py-2 px-4 rounded shadow-sm active:shadow-none active:scale-95 mx-auto text-lg w-full" onClick={async () => await fetch()}>
        {loading ? <FaSpinner className="animate-spin"/> : "Submit"}
        </button>
      </div>
    </div>
  )
  
}