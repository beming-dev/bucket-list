import { ipcRenderer } from "electron";
import { useEffect, useRef, useState } from "react";

function Home() {
  const textarea = useRef<HTMLTextAreaElement>();
  const box = useRef<HTMLFormElement>();

  const [des, setDes] = useState("");
  const [bucketList, setBucketList] = useState<bucketListType[]>([]);
  const [doneList, setDoneList] = useState<doneListType[]>([]);

  const onChange = (e) => {
    setDes(e.target.value);

    if ((box.current.scrollHeight * 2) / 3 > textarea.current.scrollHeight) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  };

  const onEnrollBucket = (e) => {
    if (des.length >= 1) ipcRenderer.send("enroll-bucket", des);
  };

  useEffect(() => {
    ipcRenderer.invoke("get-list").then((result: listType) => {
      console.log(result);
      setBucketList(result.bucket);
      setDoneList(result.done);
    });
  }, []);

  return (
    <main className="flex w-screen h-screen font-mono">
      <div className="w-1/2 bg-gray-600 p-3">
        <span>Bucket-list</span>
        <ul className="list-inside list-disc">
          {bucketList.map(
            (item: bucketListType, i) => (
              <li key={i}>{item.DES}</li>
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
              <li key={i}>{item.DES}</li>
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
            onChange={onChange}
            className="w-1/2 text-blue-500 outline-none p-1 break-all resize-none max-h-full text-sm scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium"
          />
          <button className="rounded bg-blue-500 py-2 px-5 mt-5">등록</button>
        </form>
      </div>
    </main>
  );
}

export default Home;
