const getDashboard = require("../controllers/dashboard.controller");

const authMidleware = require("../middlewares/auth.middleware");

const expres = require("express");

const router = expres.Router();

router.use(authMidleware);
router.get("/", getDashboard);

module.exports = router;
