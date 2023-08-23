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
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();
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
      for (const element of data) {
        fileService
          .uploadMultiple([element])
          .then(() => {
            res.write(`data : ${element?.fileName} uploaded succesfully \n\n`);
          })
          .catch(() => {
            res.write(`data : ${element?.fileName} upload failed \n\n`);
          });
      }
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
            .json({ message: "Error occured while deleting file" });
        });
    } catch (err) {
      res.status(500).json({ message: "Error occured while deleting file" });
    }
  }
}
module.exports = new FileController();
