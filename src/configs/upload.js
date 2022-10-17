const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      const filehash = crypto.randomBytes(10).toString("hex"); //gera um hash aleatório
      const filename = `${filehash}-${file.originalname}`; // serve para evitar que existam arquivos com nomes iguais.

      return callback(null, filename);

    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER,
}