import type { Event } from "../types";
import { useDraggable } from "@dnd-kit/core";

const availableColors = [
  "bg-rose-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-green-500",
] as const;

type Props = {
  event: Event;
  updateEventName: (eventId: number, newName: string) => void;
};

export const EventBar = ({ event, updateEventName }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `event-${event.id}`,
    });

  const eventColor = availableColors[event.id % availableColors.length];

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${eventColor} h-full flex items-center p-2 text-xs flex-col rounded-lg gap-y-2 w-full cursor-grab opacity-80 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <input
        className="text-xs truncate w-full text-left outline-none"
        value={event.name}
        onChange={(e) => updateEventName(event.id, e.target.value)}
      />
    </div>
  );
};
