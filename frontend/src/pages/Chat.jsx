import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

let socket;

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Initialize socket connection
    useEffect(() => {
        const socketURL =
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        socket = io(socketURL);
        socket.emit("join-chat", user._id);

        socket.on("receive-message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket.disconnect();
    }, [user._id]);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/messages/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Fetch messages when user is selected
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return;
            try {
                const response = await api.get(`/messages/${selectedUser._id}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [selectedUser]);

    const handleSendMessage = async (content) => {
        if (!selectedUser || !content.trim()) return;

        try {
            const response = await api.post("/messages", {
                receiverId: selectedUser._id,
                content,
            });

            const newMessage = response.data;
            socket.emit("send-message", newMessage);
            setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleBackToUsers = () => {
        setSelectedUser(null);
    };

    return (
        <div className="h-screen bg-chat-dark flex items-center justify-center px-4 py-4">
            <div className="w-full max-w-[1000px] h-full bg-chat-dark rounded-xl overflow-hidden shadow-2xl flex">
                <div
                    className={`${
                        selectedUser ? "hidden md:flex" : "flex"
                    } w-full md:w-80`}
                >
                    <Sidebar
                        users={users}
                        selectedUser={selectedUser}
                        onSelectUser={setSelectedUser}
                        loading={loading}
                    />
                </div>

                {/* Chat Window - Hidden on mobile when no user selected */}
                <div
                    className={`${
                        selectedUser ? "flex" : "hidden md:flex"
                    } flex-1`}
                >
                    <ChatWindow
                        selectedUser={selectedUser}
                        messages={messages}
                        currentUser={user}
                        onSendMessage={handleSendMessage}
                        onBack={handleBackToUsers}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;
