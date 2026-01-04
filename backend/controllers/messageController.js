const Message = require('../models/Message');
const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ 
      _id: { $ne: req.user._id }
    }).select('-password');
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'username')
    .populate('receiver', 'username');
    
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;
    
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content
    });
    
    await message.populate('sender', 'username');
    await message.populate('receiver', 'username');
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

module.exports = { getUsers, getMessages, sendMessage };

