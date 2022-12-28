import { ipcRenderer } from "electron";
import { useRouter } from "next/router";

interface propsType {
  item: bucketListType;
  setBucketList: any;
  setDoneList: any;
}

const ListItem = ({ item, setBucketList, setDoneList }: propsType) => {
  const router = useRouter();

  const onItemClick = () => {
    router.push(`/detail/${item.IDX}`);
  };
  const onDeleteClick = (idx) => {
    const result = confirm("정말 지우시겠습니까?");
    const query: queryType[] = [
      {
        sql: "DELETE FROM BUCKET WHERE IDX=?",
        value: [idx],
      },
    ];
    if (result) {
      ipcRenderer.invoke("execute-query", query).then((result: listType) => {
        setBucketList(result.bucket);
        setDoneList(result.done);
      });
    } else {
      return;
    }
  };
  const onSendClick = (idx) => {
    const result = confirm("정말 완료했습니까?");
    if (result) {
      const query: queryType[] = [
        {
          sql: `UPDATE BUCKET SET DONE=1 WHERE IDX=? `,
          value: [idx],
        },
      ];
      ipcRenderer.invoke("execute-query", query).then((result) => {
        setBucketList(result.bucket);
        setDoneList(result.done);
      });
    } else {
      return;
    }
  };
  return (
    <li className="flex w-full my-1 items-center">
      <span onClick={onItemClick} className="flex-1 cursor-pointer">
        {item.DES}
      </span>
      <div className="flex justify-self-end ml-3 items-center">
        <button className="mr-2" onClick={(e) => onDeleteClick(item.IDX)}>
          x
        </button>
        {item.DONE == false && (
          <img
            src="/images/arrow.png"
            onClick={(e) => onSendClick(item.IDX)}
            className="arrow"
          />
        )}
      </div>
      <style jsx>
        {`
          .arrow {
            width: 20px;
            height: 20px;
          }
        `}
      </style>
    </li>
  );
};

export default ListItem;
