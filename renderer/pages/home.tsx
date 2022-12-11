import { ipcRenderer } from "electron";
import { useRef, useState } from "react";

function Home() {
  const textarea = useRef<HTMLTextAreaElement>();
  const box = useRef<HTMLFormElement>();

  const [bucketList, setBucketList] = useState([
    { des: "피아노 치기" },
    { des: "피아노 치기" },
    { des: "피아노 치기" },
    { des: "피아노 치기" },
  ]);

  const [doneList, setDoneList] = useState([
    { des: "피아노 치기" },
    { des: "피아노 치기" },
    { des: "피아노 치기" },
    { des: "피아노 치기" },
  ]);

  const handleHeight = () => {
    if ((box.current.scrollHeight * 2) / 3 > textarea.current.scrollHeight) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  const onEnrollBucket = () => {
    ipcRenderer.send("test", "message");
  };

  return (
    <main className="flex w-screen h-screen font-mono">
      <div className="w-1/2 bg-gray-600 p-3">
        <span>Bucket-list</span>
        <ul className="list-inside list-disc">
          {bucketList.map(
            (item, i) => (
              <li key={i}>{item.des}</li>
            ),
            []
          )}
        </ul>
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="bg-gray-400 basis-1/2 p-3">
          <span>Done</span>
          <ul className="list-inside list-disc">
            {doneList.map((item, i) => (
              <li key={i}>{item.des}</li>
            ))}
          </ul>
        </div>
        <form
          ref={box}
          className="flex flex-col justify-center items-center bg-gray-500 basis-1/2 overflow-hidden"
          onSubmit={onEnrollBucket}
        >
          <textarea
            maxLength={300}
            ref={textarea}
            rows={1}
            onChange={handleHeight}
            className="w-1/2 text-blue-500 outline-none p-1 break-all resize-none max-h-full text-sm scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium"
          />
          <button className="rounded bg-blue-500 py-2 px-5 mt-5">등록</button>
        </form>
      </div>
    </main>
  );
}

export default Home;
