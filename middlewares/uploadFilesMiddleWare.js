const fs = require("fs");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const multerOption = (fileDest) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `./uploads/${fileDest}`;
      if (!fs.existsSync(path)) {
        if (!fs.existsSync("./uploads")) {
          fs.mkdirSync("./uploads");
        }
        fs.mkdirSync(path);
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      const uniqueSuffix = `${fileDest}-${Date.now()}-${uuidv4()}.${ext}`;
      req.body.content = uniqueSuffix;
      cb(null, uniqueSuffix);
    },
  });

  const upload = multer({ storage: storage });
  return upload;
};

exports.uploadSinglePDF = (fileName, fileDest) =>
  multerOption(fileDest).single(fileName);
