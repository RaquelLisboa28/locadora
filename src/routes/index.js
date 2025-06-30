const { Router } = require("express");
const client = require("./client");
const car = require("./car")
const rental = require("./rental")

const router = Router();

router.use("/client", client);
router.use("/car", car)
router.use("/rental", rental)

module.exports = router;
