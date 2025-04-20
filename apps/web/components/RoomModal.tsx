"use client";
import axios from "axios";
import { X, PencilRuler } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface RoomModalProps {
  setShowModal: (val: boolean) => void;
  setRooms: React.Dispatch<React.SetStateAction<{ slug: string; id: number,adminId:string}[]>>;
}

export default function RoomModal({ setShowModal,setRooms }:RoomModalProps) {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (roomNameRef.current) roomNameRef.current.focus();
  }, []);

  const handleCreateRoom = async()=>{
    setError("");
    if(!roomNameRef?.current?.value) {
      setError("Please enter a valid room name.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/rooms",{slug:roomNameRef.current.value});
      const res = await response.data;
      const {slug,id,adminId} = res.room;
      setRooms((prev)=>[...prev,{slug,id,adminId}])
      setShowModal(false);
      if (roomNameRef.current) roomNameRef.current.value = "";
    } catch (error) {
      const err = error as { response?: { data?: { error?: string } } };
      setError(
        err?.response?.data?.error || "Failed to add user. Try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 relative shadow-2xl">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-orange-500/10">
            <PencilRuler className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Create Whiteboard Room</h3>
            <p className="text-sm text-white/50">Collaborate live with your team on a new canvas.</p>
          </div>
        </div>

        <hr className="border-white/10 mb-4" />

        <div className="space-y-4">
          <input
            ref={roomNameRef}
            type="text"
            placeholder="e.g. UI Brainstorm, Sprint Planning"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <p className="text-sm text-red-400 font-medium">{error}</p>
          )}
          <button
            onClick={handleCreateRoom}
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition text-white font-medium py-2 rounded-lg"
          >
            {loading ? "Creating..." : "🚀 Create Room"}
          </button>
        </div>

        <p className="mt-4 text-xs text-white/40 text-center">
          Everyone with the link will be able to collaborate in real-time.
        </p>
      </div>
    </div>
  );
}
