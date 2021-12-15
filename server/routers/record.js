const express = require("express");
const router = express.Router();
const recordController = require("../controllers/record");
const { upload } = require("../untill/multer");
// * Post  /record

router.post("/", upload.single("image"), recordController.create);

module.exports = router;
