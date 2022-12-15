import { ipcRenderer } from "electron";
import Image from "next/image";
import { useRouter } from "next/router";

const ListItem = ({ item, setBucketList, setDoneList, bucket }) => {
  const router = useRouter();

  const onItemClick = () => {
    router.push(`/detail/${bucket ? "bucket" : "done"}/${item.IDX}`);
  };
  const onDeleteClick = (idx) => {
    const result = confirm("정말 지우시겠습니까?");
    if (result) {
      if (bucket) {
        ipcRenderer
          .invoke("delete-bucket", idx)
          .then((result: listType) => setBucketList(result.bucket));
      } else {
        ipcRenderer
          .invoke("delete-done", idx)
          .then((result: listType) => setDoneList(result.done));
      }
    } else {
      return;
    }
  };
  const onSendClick = (idx) => {
    const result = confirm("정말 완료했습니까?");
    if (result) {
      ipcRenderer.invoke("send-bucket", idx).then((result: listType) => {
        setBucketList(result.bucket);
        setDoneList(result.done);
      });
    } else {
      return;
    }
  };
  return (
    <li className="flex w-full my-1 items-center" onClick={onItemClick}>
      <span className="flex-1">{item.DES}</span>
      <div className="flex justify-self-end ml-3 items-center">
        <button className="mr-2" onClick={(e) => onDeleteClick(item.IDX)}>
          x
        </button>
        {bucket && (
          <Image
            src="/images/arrow.png"
            width="20px"
            height="20px"
            onClick={(e) => onSendClick(item.IDX)}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
