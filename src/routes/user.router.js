const { getUsers, userCreate, updateUserTutorialStatus, getUser,  } = require("../controllers/user.controller");

const router = require("express").Router();


router.get("/", getUsers);
router.get('/:id', getUser);
router.post('/create', userCreate);
router.patch("/user-tutorial-update", updateUserTutorialStatus);










module.exports = router