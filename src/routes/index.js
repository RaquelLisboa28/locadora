const { Router } = require("express");
const client = require("./client");

const router = Router();

router.use("/client", client);

module.exports = router;
