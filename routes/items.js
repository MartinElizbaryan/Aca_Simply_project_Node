const express = require('express');
const router = express.Router();

const itemsController = require("../controllers/items.controller");
// router.get("/", itemsController.findAll);
/* GET users listing. */
router.get("/", itemsController.findAll);
router.post("/", itemsController.create);
router.get("/:id", itemsController.find);
router.put("/:id", itemsController.update);
router.delete("/:id", itemsController.delete);
router.patch("/completed/:id", itemsController.completed);

module.exports = router;
