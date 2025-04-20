import Header from "../../../components/Header";
import RoomList from "../../../components/RoomList";

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden relative">
      <Header />
      <RoomList/>
    </div>
  );
}
