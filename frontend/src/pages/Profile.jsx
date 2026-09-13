import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-10">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              My Profile
            </h1>
            <p className="mt-2 text-gray-400">
              Your profile information
            </p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative group">
              <img
                src={
                  selectedImg ||
                  authUser.profilePic ||
                  "https://avatar.iran.liara.run/public/boy"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-violet-500/40 shadow-xl"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2
                  bg-violet-600 hover:bg-violet-700
                  p-3 rounded-full cursor-pointer
                  transition-all duration-300 hover:scale-110
                  shadow-lg
                  ${
                    isUpdatingProfile
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-white" />

                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-gray-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" />
                Full Name
              </div>

              <p className="px-5 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-violet-400" />
                Email Address
              </div>

              <p className="px-5 py-3 bg-slate-900/70 border border-slate-700 rounded-xl text-white">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-5">
              Account Information
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-slate-700">
                <span className="text-gray-400">
                  Member Since
                </span>

                <span className="text-white font-medium">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-gray-400">
                  Account Status
                </span>

                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/30">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;