import { ipcRenderer } from "electron";
import { useEffect, useRef, useState } from "react";
import ListItem from "../components/ListItem";

function Home() {
  const textarea = useRef<HTMLTextAreaElement>();
  const box = useRef<HTMLDivElement>();

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
    if (des.length >= 1) {
      const query: queryType[] = [
        {
          sql: "INSERT INTO BUCKET(DES,DATE) VALUES(?, datetime('now'))",
          value: [des],
        },
      ];
      ipcRenderer
        .invoke("execute-query", query)
        .then((result) => setBucketList(result.bucket));
    }
  };

  useEffect(() => {
    ipcRenderer.invoke("get-list").then((result: listType) => {
      setBucketList(result.bucket);
      setDoneList(result.done);
    });
  }, []);

  return (
    <main className="flex w-screen h-screen font-mono">
      <div className="w-1/2 bg-gray-600 p-3">
        <h2 className="text-xl text-gray-300 font-bold">Bucket-list</h2>
        <ul className="list-inside list-disc">
          {bucketList.map(
            (item: bucketListType, i) => (
              <ListItem
                item={item}
                key={item.IDX}
                setBucketList={setBucketList}
                setDoneList={setDoneList}
              />
            ),
            []
          )}
        </ul>
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="bg-gray-400 basis-1/2 p-3">
          <h2 className="text-xl text-gray-800 font-bold">Done</h2>
          <ul className="list-inside list-disc">
            {doneList.map((item, i) => (
              <ListItem
                item={item}
                key={item.IDX}
                setBucketList={setBucketList}
                setDoneList={setDoneList}
                bucket={false}
              />
            ))}
          </ul>
        </div>
        <div
          ref={box}
          className="flex flex-col justify-center items-center bg-gray-500 basis-1/2 overflow-hidden"
        >
          <textarea
            maxLength={300}
            ref={textarea}
            rows={1}
            onChange={onChange}
            className="w-1/2 text-blue-500 outline-none p-1 break-all resize-none max-h-full text-sm scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium"
          />
          <button
            className="rounded bg-blue-500 py-2 px-5 mt-5"
            onClick={onEnrollBucket}
          >
            등록
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
