import express from "express";
import multer from "multer";

const router = express.Router();

router.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  res.json({ url: `http://localhost:5000/image/${req.file.filename}` });
});

export default router;
