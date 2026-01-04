import { useAuth } from '../context/AuthContext';

const Sidebar = ({ users, selectedUser, onSelectUser, loading }) => {
  const { user, logout } = useAuth();
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className="w-full bg-chat-sidebar border-r border-chat-border flex flex-col h-full">
      {/* Header with app name and user info */}
      <div className="p-4 border-b border-chat-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-chat-green">ChatApp</h1>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Current user info */}
        <div className="flex items-center gap-3 p-2 bg-chat-hover rounded-lg">
          <div className="w-10 h-10 bg-chat-green rounded-full flex items-center justify-center text-white font-semibold">
            {getInitials(user.username)}
          </div>
          <div>
            <p className="text-white font-medium">{user.username}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
      </div>
      
      {/* Search placeholder (non-functional, just for UI) */}
      <div className="p-3">
        <div className="bg-chat-input rounded-lg px-4 py-2 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-gray-400 text-sm">Search or start new chat</span>
        </div>
      </div>
      
      {/* Users list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          // Loading state
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          // Empty state
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400">No users found</p>
          </div>
        ) : (
          // User list
          users.map((chatUser) => (
            <div
              key={chatUser._id}
              onClick={() => onSelectUser(chatUser)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                selectedUser?._id === chatUser._id
                  ? 'bg-chat-hover'
                  : 'hover:bg-chat-hover'
              }`}
            >
              {/* User avatar */}
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                {getInitials(chatUser.username)}
              </div>
              
              {/* User info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {chatUser.username}
                </p>
                <p className="text-gray-400 text-sm truncate">
                  Click to start chatting
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;

