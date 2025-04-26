"use client"
import { ClipboardEdit, PlusCircle } from "lucide-react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Room from "./Room";
import axios from "axios";
import RoomModal from "./RoomModal";

export default function RoomList() {
  const [showModal, setShowModal] = useState(false);
  const [userId,setUserId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<{ slug: string; id: number,adminId:string,members?:{id:string,name:string,email:string,image:string}[]}[]>([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    getSession();
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rooms`);
      const res = await response.data;
      setRooms([{id: 0, slug: "Your whiteboard",adminId:res.userId },...res.rooms]);
      setUserId(res.userId);
    } catch (error) {
      setRooms([{id: 0, slug: "Your whiteboard",adminId:"0" }]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) return null;

  return (
    <main className="relative z-10 pt-32 px-6 lg:px-12 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Whiteboards</h2>
        {rooms?.length !== 0 && (
          <button
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded-full font-medium shadow"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Room</span>
          </button>
        )}
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20">
          <ClipboardEdit className="mx-auto mb-4 h-10 w-10 text-orange-500" />
          <h3 className="text-xl font-semibold">No rooms yet</h3>
          <p className="text-white/50 mb-4">
            Start your first whiteboard and invite your team to collaborate!
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition"
          >
            Create Whiteboard
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <Room key={room.id} room={room} userId={userId || ""} />
          ))}
        </div>
      )}

      {showModal && (
        <RoomModal setRooms={setRooms} setShowModal={setShowModal} />
      )}
    </main>
  );
}
