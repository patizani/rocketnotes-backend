const fs = require('fs')
const path = require('path')

const uploadConfig = require('../configs/upload')

class DiskStorage {
  async savefile(file) {  //Salvar o arquivo.
    await fs.promises.rename( //quansdo salvar, mudar o arquivo de lugar da pasta temporária para a nova pasta de upload
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file)
    );
    return file;
  }

  async deletefile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);
    try { // com manipulação de arquivos é bom tratar excssões.
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
module.exports = DiskStorage;