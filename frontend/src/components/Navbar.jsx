import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group transition-all duration-300"
        >
          <div className="w-11 h-11 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-500/30 transition-all duration-300">
            <MessageSquare className="w-6 h-6 text-violet-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              Talkative
              <span className="ml-1">🦜</span>
            </h1>

            <p className="text-xs text-gray-400 hidden sm:block">
              Connect • Chat • Share
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
    
      

          {authUser && (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 text-gray-300 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block font-medium">
                  Profile
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block font-medium">
                  Logout
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;