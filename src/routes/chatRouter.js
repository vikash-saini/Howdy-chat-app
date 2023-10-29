const express = require('express');
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
  } = require("../controller/chatController");
const validateUser = require('../middleware/authMiddleware');



const router = express.Router();


router.route("/").post(validateUser, accessChat);
router.route("/").get(validateUser, fetchChats);
router.route("/group").post(validateUser, createGroupChat);
router.route("/rename").put(validateUser, renameGroup);
router.route("/groupremove").put(validateUser, removeFromGroup);
router.route("/groupadd").put(validateUser, addToGroup);



module.exports = router;
