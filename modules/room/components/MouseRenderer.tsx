import { socket } from "@/common/lib/socket";
import { useEffect, useState } from "react";
import { SocketMouse } from "./SocketMouse";

export const MouseRenderer = () => {
  const [mouses, setMouses] = useState<string[]>([]);

  // listen to the users in room event from the server.
  useEffect(() => {
    socket.on("users_in_room", (socketIds) => {
      const allUsers = socketIds.filter((socketId) => socketId !== socket.id);
      setMouses(allUsers);
    });

    return () => {
      socket.off("users_in_room");
    };
  }, []);

  return (
    <>
      {mouses.map((socketId) => {
        return <SocketMouse socketId={socketId} key={socketId} />;
      })}
    </>
  );
};
