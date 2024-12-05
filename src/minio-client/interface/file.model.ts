export interface BufferedFile {
  fieldName: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer;
}

export interface StoredFile extends HasFile, StoredFileMetaData {}

export interface HasFile {
  file: Buffer | string;
}

export interface StoredFileMetaData {
  id: string;
  name: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}

export type AppMimeType = 'image/jpg' | 'image/jpeg' | 'image/png';
