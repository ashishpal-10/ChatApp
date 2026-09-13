import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-md w-full text-center bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">
        {/* Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-violet-500/20 blur-2xl animate-pulse"></div>

            <div
              className="relative w-24 h-24 rounded-3xl bg-violet-600/20
              border border-violet-500/30 flex items-center justify-center
              animate-pulse shadow-xl"
            >
              <MessageSquare className="w-12 h-12 text-violet-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome to Chatty!
        </h2>

        <p className="text-gray-400 leading-7 text-lg">
          Select a conversation from the sidebar to start chatting
        </p>

        {/* Decorative Line */}
        <div className="mt-8 flex justify-center">
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;