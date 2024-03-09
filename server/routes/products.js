const express=require('express');
const path=require('path')
const {
  allProducts,
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products.js");
const router = express.Router();
const multer=require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
router.get("/", allProducts);
router.get("/:id", viewProduct);
router.post("/add",upload.single("image"),addProduct);
router.put("/edit/:id",upload.single("image"),editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = { router };
