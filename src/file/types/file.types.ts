export type FileQuery = {
  size: string;
  date: string;
};

export type FileParams = {
  objectName: string;
};

export type UploadedFile = {
  size: number;
  objectName: string;
  name: string;
  type: string;
};
