import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import SidebarSkeletons from "./skeletons/SidebarSkeletons.jsx";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

    // console.log(selectedUser)

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeletons />;

  return (
    <aside className="h-full w-full bg-slate-950/40 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <Users className="w-6 h-6 text-violet-400" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">Contacts</h2>
          </div>
        </div>

        {/* Online Filter */}
        <div className="mt-5 flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-slate-800 text-violet-500 focus:ring-violet-500"
            />

            <span className="text-sm text-gray-300">
              Show online only
            </span>
          </label>
        </div>
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}

            onClick={() => 
             {  console.log("Clicked:", user);
  setSelectedUser(user);
  console.log("Store:", useChatStore.getState().selectedUser);}
              }
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300
              ${
                selectedUser?._id === user._id
                  ? "bg-violet-600/20 border border-violet-500/40 shadow-lg shadow-violet-900/20"
                  : "hover:bg-slate-800/60"
              }`}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.profilePic || "https://i.pravatar.cc/300"}
                alt={user.fullName}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
              />

                {/* Online Users */}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900" />
              )}
            </div>

            {/* User Info */}
            <div className="text-left min-w-0 flex-1">
              <h3 className="text-white font-semibold truncate">
                {user.fullName}
              </h3>
               <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

          {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showOnlineOnly ? "No online users" : "No other users yet. Share the app to add contacts!"}
          </div>
          )}
      </div>
    </aside>
  );
};

export default Sidebar;