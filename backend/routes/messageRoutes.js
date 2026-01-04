const express = require('express');
const router = express.Router();
const { getUsers, getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/users', protect, getUsers);
router.get('/:userId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;

