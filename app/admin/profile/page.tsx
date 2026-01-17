"use client";

import { useState, useEffect } from "react";
import { useAuthUser, useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";

export default function AdminProfilePage() {
  const user = useAuthUser();
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);

  // UI toggles (frontend only)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [activityLogs, setActivityLogs] = useState<
    { action: string; date: string }[]
  >([]);

  /* Preview Image */
  useEffect(() => {
    if (!profilePic) return;

    const url = URL.createObjectURL(profilePic);
    setProfilePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [profilePic]);

  /* Mock activity log */
  useEffect(() => {
    setActivityLogs([
      { action: "Logged in", date: "2026-01-12 10:15 AM" },
      { action: "Created new offer", date: "2026-01-11 03:22 PM" },
      { action: "Updated branch info", date: "2026-01-10 11:45 AM" },
      { action: "Added menu item", date: "2026-01-09 04:10 PM" },
    ]);
  }, []);

  const handleSave = () => {
    if (!user?.id) {
      alert("User not found");
      return;
    }

    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSaving(true);

    try {
      dispatch(
        setUser({
          id: user.id,
          name,
          email,
        }),
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-4xl font-bold overflow-hidden">
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

            <label className="mt-3 cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files && setProfilePic(e.target.files[0])
                }
              />
            </label>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="font-semibold">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="font-semibold">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="New Password"
                className="border px-4 py-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border px-4 py-2 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Settings */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <span>Two-Factor Auth</span>
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                />
              </div>

              <div className="flex justify-between">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() =>
                    setNotificationsEnabled(!notificationsEnabled)
                  }
                />
              </div>

              <div className="flex justify-between">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>

              <div className="flex justify-between">
                <span>Role</span>
                <span className="font-semibold">Admin</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded font-bold mt-4"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-10">
          <h3 className="font-bold text-lg mb-3">Recent Activity</h3>
          <ul className="divide-y">
            {activityLogs.map((log, i) => (
              <li key={i} className="py-2 flex justify-between text-sm">
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
