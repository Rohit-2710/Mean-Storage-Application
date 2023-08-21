const fileService = require("./../Services/fileService");

class FileController {
  constructor() {}
  async uploadSingle(req, res) {
    try {
      console.log(req.body);
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
            message: "Error occured while uploading file in err file",
          });
        });
    } catch (err) {
      res.status(500).json({ message: "Error occured while uploading file" });
    }
  }
}
module.exports = new FileController();
