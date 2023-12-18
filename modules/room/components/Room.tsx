import RoomContextProvider from "../context/room.context";
import Canvas from "./Canvas";
import { MousePosition } from "./MousePosition";
import { MouseRenderer } from "./MouseRenderer";

const Room = () => {
  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
