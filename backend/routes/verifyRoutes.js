const express = require("express");
const { verifyCode } = require("../controllers/verifyController");
const router = express.Router();

router.post("/verify", verifyCode);

module.exports = router;
