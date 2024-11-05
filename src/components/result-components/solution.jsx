import { useNavigate } from "react-router-dom";
import markdownToHtml from "../../utils/markdown-to-html";

export default function Solution({ solution }){
  const convertMarkdown = () => {
    return markdownToHtml(solution);
  }
  return (
    <div className="bg-black py-10 px-2 gap-2 flex flex-col">
      <header>
        <h1 className="text-2xl font-bold">Calcobot</h1>
      </header>
      <section>
      XXX
      </section>
      <section className="bg-neutral-700 p-2 rounded-md text-lg h-fit w-full" dangerouslySetInnerHTML={{
        __html: convertMarkdown()
      }}>
      </section>
    </div>
  )
}