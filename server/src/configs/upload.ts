import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: path.join(tempFolder),

  storage: multer.diskStorage({
    destination: tempFolder,

    filename: (request, file, callback) => {
      const fileHashname = crypto.randomBytes(8).toString('hex');
      const fileName = `${fileHashname}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
