"use client";

import { useState, useEffect } from "react";
import { useAuthUser, useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";

export default function AdminProfilePage() {
  const user = useAuthUser();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Advanced UI toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock activity logs
  const [activityLogs, setActivityLogs] = useState<
    { action: string; date: string }[]
  >([]);

  useEffect(() => {
    if (profilePic) {
      const objectUrl = URL.createObjectURL(profilePic);
      setProfilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profilePic]);

  // Populate mock activity logs
  useEffect(() => {
    setActivityLogs([
      { action: "Logged in", date: "2026-01-12 10:15 AM" },
      { action: "Created new offer", date: "2026-01-11 03:22 PM" },
      { action: "Updated branch info", date: "2026-01-10 11:45 AM" },
      { action: "Added new menu item", date: "2026-01-09 04:10 PM" },
    ]);
  }, []);

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setSaving(true);

    try {
      const updatedUser = {
        ...user,
        name,
        email,
      };
      dispatch(setUser(updatedUser));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>

      {/* Profile & Avatar */}
      <div className="bg-white rounded-lg shadow p-6 md:max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold bg-yellow-400 overflow-hidden mb-4">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                name?.[0] || "A"
              )}
            </div>
            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm font-medium">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files && setProfilePic(e.target.files[0])
                }
              />
            </label>
          </div>

          {/* Main Form */}
          <div className="flex-1 space-y-4 w-full">
            {/* Name & Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="mt-4 space-y-2">
              <h3 className="text-gray-800 font-bold text-lg">
                Advanced Options
              </h3>
              <div className="flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className="w-5 h-5 accent-yellow-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                  className="w-5 h-5 accent-yellow-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="w-5 h-5 accent-yellow-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Role (Read-only)</span>
                <span className="font-semibold text-gray-700">
                  {user?.role || "user"}
                </span>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg mt-4 transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="mt-8">
          <h3 className="text-gray-800 font-bold text-lg mb-3">
            Recent Activity
          </h3>
          <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {activityLogs.map((log, i) => (
              <li
                key={i}
                className="py-2 flex justify-between text-gray-700 text-sm"
              >
                <span>{log.action}</span>
                <span className="text-gray-500">{log.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
