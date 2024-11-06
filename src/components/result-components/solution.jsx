import { useNavigate } from "react-router-dom";
import { useState } from "react";
import markdownToHtml from "../../utils/markdown-to-html";
import htmlToText from "../../utils/html-to-txt";
import copyToClipboard from "../../utils/copy-to-clipboard";
import textToSpeech from "../../utils/text-to-speech";
import textToFile from "../../utils/text-to-file";
import getMathsSolution from "../../utils/getMathsSolution";
import { useData } from "../../store";

import { IoCaretBackSharp } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaStop } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";

export default function Solution({ solution }){
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false)
  const data = useData(state => state.data);
  const navigate = useNavigate();
  const [htmlText, setHtmlText] = useState(markdownToHtml(solution));
  const text = () => htmlToText(htmlText);
  const copy = () => {
    copyToClipboard(text());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const speak = () => {
    if(speaking){
      textToSpeech();
      setSpeaking(false);
      return;
    };
    textToSpeech(text()); 
    setSpeaking(true);
  }
  const download = () => textToFile(text(), "Maths-Solution")
  const refresh = async () => {
    setLoading(true)
    const markdown = await getMathsSolution(data);
    setHtmlText(markdownToHtml(markdown));
    setLoading(false);
  }
  return (
    <div className="bg-black py-10 px-2 gap-2 flex flex-col min-h-[100vh]">
      <header>
        <h1 className="text-2xl font-bold text-white">Calcobot</h1>
      </header>
      <section className="flex gap-2">
        <div className="flex justify-center items-center text-center bg-white fill-black text-2xl p-2 rounded shadow-sm active:shadow-none active:scale-95" onClick={() => navigate("/")}>
          <IoCaretBackSharp />
        </div>
        <div className="flex justify-center items-center text-center bg-white fill-black text-2xl p-2 rounded shadow-sm active:shadow-none active:scale-95" onClick={() => refresh()}>
          <RiRefreshLine className={loading&&"animate-spin"}/>
        </div>
        <div className="flex justify-center items-center text-center bg-white fill-black text-2xl p-2 rounded shadow-sm active:shadow-none active:scale-95" onClick={() => copy()}>
          {copied ? <IoCheckmarkDoneOutline /> : <IoCopyOutline />}
        </div>
        <div className="flex justify-center items-center text-center bg-white fill-black text-2xl p-2 rounded shadow-sm active:shadow-none active:scale-95" onClick={() => speak()}>
          {speaking ? <FaStop /> : <HiMiniSpeakerWave />}
        </div>
        <div className="flex justify-center items-center text-center bg-white fill-black text-2xl p-2 rounded shadow-sm active:shadow-none active:scale-95" onClick={() => download()}>
          <IoDownloadOutline />
        </div>
      </section>
        <section className="bg-white p-2 rounded-md text-lg h-fit w-full min-h-20 display" dangerouslySetInnerHTML={{
        __html: htmlText
      }}>
      </section>
    </div>
  )
}