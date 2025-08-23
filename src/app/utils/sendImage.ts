import fs from 'fs';
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); //  extension (.jpg / .png / .jpeg)
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
export const deleteFile = (filename: string) => {
  try {
    const filePath = path.join(process.cwd(), "public", filename); // যেখানে upload হয়
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error("File delete failed:", error);
  }
};