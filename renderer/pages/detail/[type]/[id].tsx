import { ipcRenderer } from "electron";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const detail = () => {
  const [des, setDes] = useState("hello");
  const router = useRouter();

  const box = useRef<HTMLDivElement>();
  const textarea = useRef<HTMLTextAreaElement>();

  const onChange = (e) => {
    setDes(e.target.value);

    if ((box.current.scrollHeight * 2) / 3 > textarea.current.scrollHeight) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + 12 + "px";
    }
  };

  const { type, id } = router.query;
  useEffect(() => {
    const query: queryType[] = [
      {
        sql: "SELECT * FROM DETAIL ",
        value: [],
      },
    ];
    ipcRenderer.invoke("execute-query", query);
  }, []);

  const onSaveDetail = () => {
    const query: queryType[] = [
      //Todo: upsert
      {
        sql: "INSERT INTO DETAIL(FID, DES) VALUES(?, ?)",
        value: [id, des],
      },
    ];
    ipcRenderer.invoke("execute-query", query);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <span onClick={router.back} className="absolute top-1 left-4 text-4xl">
        x
      </span>
      <div
        ref={box}
        className="relative w-2/3 h-2/3 bg-gray-500 rounded-lg flex flex-col justify-center items-center"
      >
        <textarea
          rows={1}
          defaultValue={des}
          ref={textarea}
          className="w-1/2 bg-gray-500 resize-none outline-0 text-center border-2 border-solid rounded-lg border-gray-400 py-1"
          onChange={onChange}
        ></textarea>
        <button
          onClick={onSaveDetail}
          className="absolute border-2 border-solid rounded-lg border-gray-400 py-2 px-4 bottom-2 hover:bg-white hover:text-black duration-500"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default detail;
