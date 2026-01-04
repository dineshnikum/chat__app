import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

const ChatWindow = ({
    selectedUser,
    messages,
    currentUser,
    onSendMessage,
    onBack,
}) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    if (!selectedUser) {
        return (
            <div className="flex-1 bg-chat-panel flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-chat-hover rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl text-white font-semibold mb-2">
                        Welcome to ChatApp
                    </h2>
                    <p className="text-gray-400 max-w-md">
                        Select a user from the sidebar to start a conversation.
                        Your messages are private and secure.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-chat-panel flex flex-col w-full">
            {/* Chat Header */}
            <div className="px-4 py-3 bg-chat-sidebar border-b border-chat-border flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="md:hidden text-gray-400 hover:text-white transition-colors"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(selectedUser.username)}
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-white font-medium truncate">
                        {selectedUser.username}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Click to view contact info
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-center">
                            No messages yet.
                            <br />
                            Send a message to start the conversation!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {messages.map((message) => {
                            const isSentByMe =
                                message.sender._id === currentUser._id ||
                                message.sender === currentUser._id;

                            return (
                                <div
                                    key={message._id}
                                    className={`flex ${
                                        isSentByMe
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                                            isSentByMe
                                                ? "bg-message-out text-white rounded-tr-none"
                                                : "bg-message-in text-white rounded-tl-none"
                                        }`}
                                    >
                                        <p className="break-words">
                                            {message.content}
                                        </p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                isSentByMe
                                                    ? "text-green-200"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {formatTime(message.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;
