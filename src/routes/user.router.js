const { getUsers, userCreate } = require("../controllers/user.controller");

const router = require("express").Router();


router.get("/", getUsers);
router.post('/create', userCreate);











module.exports = router