const express = require("express");
const { allMessages, sendMessage } = require("../controller/messageController");
const validateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(validateUser, allMessages);
router.route("/").post(validateUser, sendMessage);

module.exports = router;
