export type FileQuery = {
  size: string;
  date: string;
};

export type FileParams = {
  fileName: string;
};

export type UploadedFile = {
  size: number;
  objectName: string;
  name: string;
  type: string;
};
