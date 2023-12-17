const path = require("path");
const multer = require("multer"); //lib para fazer upload
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // onde a img chega
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); // onde img vai ficar

const MULTER = { 
  storage: multer.diskStorage({//onde vai mandar o arquivo
    destination: TMP_FOLDER,
    filename(request, file, callback){ // o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}