const {getMessages, addMessages } = require('../controllers/messagesController');
const router = require('express').Router();

router.post('/addmessages/', addMessages);
router.post('/getmessages/', getMessages);

module.exports = router;