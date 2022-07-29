const fs = require("fs");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const ApiError = require('../utils/apiErrors')

const multerOptionPDF = (fileDest) => {
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

const multerOptionImage = (fileDest) => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Images only supported", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSinglePDF = (fileName, fileDest) =>
  multerOptionPDF(fileDest).single(fileName);

exports.uploadSingleImage = (fileName) => multerOptionImage().single(fileName);
