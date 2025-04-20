"use client";

import { UserPlus } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { MouseEvent, useState } from "react";
import MemberModal from "./MemberModal";

interface RoomPropTypes {
  room: { slug: string; id: number; adminId: string };
  userId: string;
}

export default function Room({ room, userId }: RoomPropTypes) {
  const isAdmin = room.adminId === userId && room.id !== 0;
  const href = room.id ? `/canvas/${room.id}` : "/canvas";
  const [modal, setModal] = useState(false);

  const handleAdminClick = (e: MouseEvent) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <>
      <Link
        href={href}
        className={clsx(
          "group relative flex items-center justify-between gap-4 rounded-2xl p-5 border transition-all duration-300",
          "bg-white/5 border-white/10 shadow-sm backdrop-blur-md hover:bg-white/10 hover:shadow-md"
        )}
      >
        <div className="flex flex-col">
          <h2 className="text-white text-lg font-semibold tracking-wide line-clamp-1">
            {room.slug}
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Click to open and sketch ideas
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleAdminClick}
            className="flex items-center justify-center p-2.5 rounded-full bg-transparent hover:bg-white/10 transition-opacity duration-200"
            title="Add members to this room"
          >
            <UserPlus className="w-5 h-5 text-orange-400 opacity-70 group-hover:opacity-100" />
          </button>
        )}
      </Link>

      {modal && (
        <MemberModal roomId={room.id} setShowAddUserModal={setModal} />
      )}
    </>
  );
}
