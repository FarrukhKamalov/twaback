const { tutorialAllGet, tutorialCreate, tutorailUpdate, tutorialDelete } = require("../controllers/tutorial.controller");

const router = require("express").Router();





router.get("/", tutorialAllGet);
router.post('/', tutorialCreate);
router.patch("/:id", tutorailUpdate);
router.delete("/:id",  tutorialDelete);




module.exports = router;