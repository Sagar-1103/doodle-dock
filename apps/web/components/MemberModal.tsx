"use client";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { X, UserPlus } from "lucide-react";

interface AddUserModalProps {
  roomId: number;
  setShowAddUserModal: (val: boolean) => void;
  onUserAdded?: (userId: string) => void;
}

export default function MemberModal({
  roomId,
  setShowAddUserModal,
}: AddUserModalProps) {
  const userInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userInputRef.current) userInputRef.current.focus();
  }, []);

  const handleAddUser = async () => {
    setError("");
    const userInput = userInputRef.current?.value.trim();
    if (!userInput) {
      setError("Please enter a valid user email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.patch(`/api/rooms/${roomId}/add-user`, {
        email: userInput, // adjust key based on backend (email, id, etc.)
      });
      const res = await response.data;
      console.log(res);
      
      // const { userId } = response.data;
      // onUserAdded?.(userId);
      setShowAddUserModal(false);
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      setError(
        err?.response?.data?.error || "Failed to add user. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed select-none pointer-none inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 relative shadow-2xl">
        <button
          onClick={() => setShowAddUserModal(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-orange-500/10">
            <UserPlus className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Add User to Room</h3>
            <p className="text-sm text-white/50">
              Invite collaborators to join this canvas.
            </p>
          </div>
        </div>

        <hr className="border-white/10 mb-4" />

        <div className="space-y-4">
          <input
            ref={userInputRef}
            type="text"
            placeholder="Enter email or username"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <p className="text-sm text-red-400 font-medium">{error}</p>
          )}
          <button
            onClick={handleAddUser}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition text-white font-medium py-2 rounded-lg"
          >
            {loading ? "Adding..." : "✅ Add User"}
          </button>
        </div>

        <p className="mt-4 text-xs text-white/40 text-center">
          They’ll be added as a member to this whiteboard room.
        </p>
      </div>
    </div>
  );
}
