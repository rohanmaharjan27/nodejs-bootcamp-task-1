import { Request } from 'express';
import moment from 'moment';
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, './images/books/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const bookUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, //10MB
  },
  fileFilter,
});

export default bookUpload;
