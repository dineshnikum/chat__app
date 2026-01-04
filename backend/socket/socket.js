const userSocketMap = {};

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`🔌 User connected: ${socket.id}`);

        socket.on("join-chat", (userId) => {
            userSocketMap[userId] = socket.id;
            socket.join(userId);
            console.log(`👤 User ${userId} joined their room`);
        });

        socket.on("send-message", (messageData) => {
            const receiverId = messageData.receiver._id || messageData.receiver;
            console.log(`📨 Message from ${messageData.sender.username} to ${receiverId}`);
            
            // Emit to receiver's room only
            io.to(receiverId).emit("receive-message", messageData);
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of Object.entries(userSocketMap)) {
                if (socketId === socket.id) {
                    delete userSocketMap[userId];
                    console.log(`👋 User ${userId} disconnected`);
                    break;
                }
            }
        });
    });
};

module.exports = { setupSocket };
