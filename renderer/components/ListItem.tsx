import { ipcRenderer } from "electron";
import Image from "next/image";

const ListItem = ({ item }) => {
  const onDeleteClick = (idx) => {
    const result = confirm("정말 지우시겠습니까?");
    if (result) {
      ipcRenderer.send("delete-bucket", idx);
    } else {
      return;
    }
  };
  const onSendClick = (idx) => {
    const result = confirm("정말 완료했습니까?");
    if (result) {
      ipcRenderer.send("send-bucket");
    } else {
      return;
    }
  };
  return (
    <li className="flex w-full my-1 items-center">
      <span className="flex-1">{item.DES}</span>
      <div className="flex justify-self-end ml-3 items-center">
        <button className="mr-2" onClick={(e) => onDeleteClick(item.IDX)}>
          x
        </button>
        <Image
          src="/images/arrow.png"
          width="20px"
          height="20px"
          onClick={(e) => onSendClick(item.IDX)}
        />
      </div>
    </li>
  );
};

export default ListItem;
