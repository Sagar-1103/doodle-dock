"use client";

import axios from "axios";
import { X, Trash2, UserPlus } from "lucide-react";
import Image from "next/image";

interface MemberModalProps {
  roomId: number;
  setUsersModal: (val: boolean) => void;
  setShowAddUserModal: (val: boolean) => void;
  members?:{id:string,name:string,email:string,image:string}[];
  adminId:string;
  userId:string;
}

export default function RoomUsers({ roomId, adminId, userId, setUsersModal, setShowAddUserModal, members }: MemberModalProps) {
  
  const handleRemoveMember = async(email:string)=>{
    try {
      const response = await axios.patch(`/api/rooms/${roomId}/remove-user`,{email});
      const res = await response.data;
      console.log(res);
      setUsersModal(false);
      setShowAddUserModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-[#111111] text-white w-full max-w-md rounded-lg shadow-xl border border-gray-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-xl font-semibold">Participants</h3>
          <div className="flex gap-3 items-center">
            {adminId===userId && <button 
              onClick={() => setShowAddUserModal(true)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Add participant"
            >
              <UserPlus className="w-6 h-6 text-green-400" />
            </button>}
            <button 
              onClick={() => setUsersModal(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <ul className="max-h-96 overflow-y-auto">
          {members?.map((participant) => (
            <li
              key={participant.id}
              className="flex items-center justify-between px-6 py-3 hover:bg-gray-800 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-medium">
                  <Image className="rounded-full" src={participant.image} alt="member" width={100} height={100} />
                </div>
                <span className="text-base">{participant.email}</span>
              </div>
              {userId===adminId && participant.id!==userId && <button onClick={()=>handleRemoveMember(participant.email)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2">
                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-400" />
              </button>}
            </li>
          ))}
          {members?.length === 0 && (
            <li className="py-6 text-center text-base text-gray-400">
              No participants yet
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}