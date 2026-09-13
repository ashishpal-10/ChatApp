import { ArrowLeft, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button - mobile only */}
          <button
            onClick={() => setSelectedUser(null)}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            aria-label="Back to contacts"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "https://i.pravatar.cc/300"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            {/* <p className="text-sm text-base-content/70">
              {users.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="hidden md:flex p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;