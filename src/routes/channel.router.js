const { getChannels, createChannel, updateChannel, deleteChannel,  } = require("../controllers/channel.controller");

const router = require("express").Router();


router.get("/", getChannels);
router.post('/', createChannel);
router.patch("/:id", updateChannel);
router.delete("/:id",  deleteChannel);

module.exports = router;