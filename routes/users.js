const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users.controller");

/* GET users listing. */
router.get("/:id", usersController.find);
router.get("/:id/messages", usersController.findWithMessages);
router.put("/:id", usersController.update);
router.patch("/:id/add-money", usersController.addMoney);

module.exports = router;
