import { useRef } from "react";

function Home() {
  const textarea = useRef<HTMLTextAreaElement>();
  const box = useRef<HTMLDivElement>();

  const handleHeight = () => {
    if (box.current.scrollHeight * 2 / 3 > textarea.current.scrollHeight) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  }

  return (
    <main className="flex w-screen h-screen font-mono">
      <div className="w-1/2 bg-gray-600">한글</div>
      <div className="w-1/2 flex flex-col">
        <div className="bg-gray-400 basis-1/2">
          hello
        </div>
        <div ref={box} className="flex flex-col justify-center items-center bg-gray-500 basis-1/2 overflow-hidden">
          <textarea maxLength={300} ref={textarea} rows={1} onChange={handleHeight} className="w-2/3 text-blue-500 outline-none p-1 break-all resize-none max-h-full text-sm scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium" />
          <button className="rounded bg-blue-500 py-2 px-5 mt-5">등록</button>
        </div>
      </div>
    </main>
  );
}

export default Home;
