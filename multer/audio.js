const multer = require("multer");
const path = require("path");

const MIMETYPES = ["audio/mpeg"];

const audioUpload = multer({
    storage: multer.diskStorage(
        {
            destination: "./uploads/audio",
            filename: (req, file, cb) => {

                const ext = path.extname(file.originalname);
                const fileName = file.originalname.split(ext)[0];

                uplName = `${fileName}-${Date.now()}${ext}`;

                cb(null, uplName);
               
            }
        }
    ),
    fileFilter: (req,file,cb) => {
        if (MIMETYPES.includes(file.mimetype)) cb(null, true)
        else cb (new Error("Only mp3 allowed"))
    },
    limits: {
        fieldSize: 10000000
    }
})

module.exports = audioUpload