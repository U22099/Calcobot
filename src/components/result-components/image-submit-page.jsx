import { useData } from "../../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import getMathsSolution from "../../utils/getMathsSolution";

export default function Image({ setShowSolution, setSolution }){
  const navigate = useNavigate();
  const data = useData(state => state.data);
  const [ loading, setLoading ] = useState(false);
  const fetch = async () => {
    setLoading(true);
    const solution = await getMathsSolution(data);
    setSolution(solution);
    setShowSolution(true);
  }
  
  return(
    <div className="p-5 w-full min-h-[100vh] flex flex-col gap-4 mx-auto py-5 dark:bg-black">
      <img src={data} className="rounded-md p-1 border-2 border-black dark:border-white h-[75vh]"/>
      <div className="flex gap-2 justify-between items-center w-full">
        <button className="flex justify-center items-center text-center bg-black dark:bg-white text-white dark:text-black fill-white dark:fill-black font-bold py-2 px-4 rounded shadow-sm active:shadow-none active:scale-95 mx-auto text-lg w-full" onClick={() => navigate("/")}>Retake</button>
        <button className="flex justify-center items-center text-center bg-black dark:bg-white text-white dark:text-black fill-white dark:fill-black font-bold py-2 px-4 rounded shadow-sm active:shadow-none active:scale-95 mx-auto text-lg w-full" onClick={async () => await fetch()}>
        {loading ? <ImSpinner2 className="animate-spin-fast"/> : "Submit"}
        </button>
      </div>
    </div>
  )
  
}