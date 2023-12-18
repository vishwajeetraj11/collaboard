import { useEffect, useState } from "react";
import { useBoardPosition } from "../hooks/useBoardPosition";
import { socket } from "@/common/lib/socket";
import { motion } from "framer-motion";
import { BsCursorFill } from "react-icons/bs";

export const SocketMouse = ({ socketId }: { socketId: string }) => {
  const boardPosition = useBoardPosition();
  const [x, setX] = useState(boardPosition.x.get());
  const [y, setY] = useState(boardPosition.y.get());

  const [pos, setPos] = useState({ x: -1, y: -1 });

  // Move the Socket Mouse
  useEffect(() => {
    socket.on("mouse_moved", (newX, newY, socketIdMoved) => {
      if (socketIdMoved === socketId) {
        setPos({ x: newX, y: newY });
      }
    });
    return () => {
      socket.off("mouse_moved");
    };
  }, [socketId]);

  // Subscribe on to the onChange callback of x and y corrdinates.
  useEffect(() => {
    const unsubscribe = boardPosition.x.onChange(setX);
    return unsubscribe;
  }, [boardPosition.x]);

  useEffect(() => {
    const unsubscribe = boardPosition.y.onChange(setY);
    return unsubscribe;
  }, [boardPosition.y]);

  return (
    <motion.div
      className={`absolute top-0 left-0 text-blue-800 ${
        pos.x === -1 && "hidden"
      }`}
      animate={{ x: pos.x + x, y: pos.y + y }}
      transition={{ duration: 0.3, easy: "linear" }}
    >
      <BsCursorFill className="-rotate-90" />
    </motion.div>
  );
};
