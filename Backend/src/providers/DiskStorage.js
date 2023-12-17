const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class diskStorage {
  async saveFile(file){
    await fs.promises.rename( //rename no fs ira mudar o arquivo(file) de lugar. Ira de TMP_FOLDER para UPLOADS_FOLDER
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );
    return file;
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath); //stat retorna o status do arquivo (arquivo disponivel, quebrado, aberto,...)
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // remove um arquivo
  }
}

module.exports = diskStorage;