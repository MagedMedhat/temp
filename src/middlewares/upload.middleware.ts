import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import AppError from '../error/AppError.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.fieldname === 'logo' && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else if (file.fieldname === 'resume' && file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Invalid file type. Logo: image only, Resume: PDF only.', 400));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});