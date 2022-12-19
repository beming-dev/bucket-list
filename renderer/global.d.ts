declare global {
  interface Window {
    ipcRender: {
      onResponse: any;
    };
  }
}

interface detailType {
  IDX: number;
  FID: number;
  DES: string;
}

interface bucketListType {
  IDX: number;
  DES: string;
  DATE: string;
}

interface doneListType {
  IDX: number;
  DES: string;
  DATE: string;
}

interface listType {
  bucket: bucketListType[];
  done: doneListType[];
}

interface queryType {
  sql: string;
  value: any[];
}
