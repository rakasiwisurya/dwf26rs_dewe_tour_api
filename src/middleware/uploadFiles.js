const multer = require("multer");

exports.uploadFiles = (imageFile, location) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, location);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg)$/)) {
        req.fileValidationError = {
          message: "Only images file are allowed",
        };

        return cb(new Error("Only images file are allowed"), false);
      }

      cb(null, true);
    }
  };

  const sizeInMB = 10;
  const maxSize = sizeInMB * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageFile,
      maxCount: 4,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      // if (!req.files && !err) {
      //   return res.status(400).send({
      //     message: "please select file to upload",
      //   });
      // }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized is 10MB",
          });
        }
        return res.status(400).send(err);
      }

      return next();
    });
  };
};
