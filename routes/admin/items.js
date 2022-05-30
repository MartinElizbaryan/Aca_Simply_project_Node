const express = require('express');
const router = express.Router();

const itemsController = require("../../controllers/admin/items.controller");
// router.get("/", itemsController.findAll);
/* GET users listing. */

router.patch("/trusted/:id", itemsController.trusted);

module.exports = router;
