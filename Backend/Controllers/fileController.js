const fileService = require("./../Services/fileService");

class FileController {
  constructor() {}
  async uploadSingle(req, res) {
    try {
      const { originalname, buffer } = req.file;
      let data = {};
      data.file = buffer.toString("base64");
      data.email = req.email;
      data.fileName = originalname;
      data.fileType = originalname.split(".")[1];
      fileService
        .uploadSingle(data)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error occured while uploading file",
          });
        });
    } catch (err) {
      res.status(500).json({ message: "Error occured while uploading file" });
    }
  }
  async uploadMultiple(req, res) {
    try {
      const fileArray = req.files;
      const data = fileArray.map((item) => {
        let file = {};
        const { originalname, buffer } = item;
        file.file = buffer.toString("base64");
        file.fileName = originalname;
        file.fileType = originalname.split(".")[1];
        file.email = req.email;
        return file;
      });
      fileService
        .uploadMultiple(data)
        .then(() => {
          res.status(204).json();
        })
        .catch(() => {
          res.status(500).json({
            message: "Error occured while uploading files",
          });
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error occured while uploading files" });
    }
  }
  async getAllFiles(req, res) {
    try {
      const { email } = req.body;
      fileService
        .getAllFiles({ email: email })
        .then((response) => {
          res.status(200).json({ data: response });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error occured while fetching files" });
        });
    } catch (err) {
      res.status(500).json({ message: "Error occured while fetching files" });
    }
  }
  async getFilesByType(req, res) {
    try {
      const { email, fileType } = req.body;
      fileService
        .getFilesByType({ email: email, fileType: fileType })
        .then((result) => {
          res.status(200).json({ response: result });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error occured while fetching files" });
        });
    } catch (err) {
      res.status(500).json({ message: "Error occured while fetching files" });
    }
  }
  async deleteFile(req, res) {
    try {
      const { id } = req.body;
      fileService
        .deleteFile({ id: id })
        .then(() => {
          res.status(204).json();
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error occured while deleting file in promise" });
        });
    } catch (err) {
      res.status(500).json({ message: "Error occured while deleting file" });
    }
  }
}
module.exports = new FileController();
