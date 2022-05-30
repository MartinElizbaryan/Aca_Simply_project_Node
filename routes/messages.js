const express = require('express');
const router = express.Router();

const messagesController = require("../controllers/messages.controller");
// router.get("/", itemsController.findAll);
/* GET users listing. */
router.get("/", messagesController.findAll);
router.post("/", messagesController.create);

module.exports = router;
