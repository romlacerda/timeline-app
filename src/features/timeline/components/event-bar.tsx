import dayjs from "dayjs";
import type { Event } from "../types";

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

export const EventBar = ({ event }: { event: Event }) => {
  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  return (
    <div
      className={`${randomColor} flex items-center p-2 text-xs flex-col rounded-lg w-60 gap-y-2 w-full`}
    >
      <div className="text-xs w-full text-left">
        {dayjs(event.start).format("MM/DD/YYYY")} -{" "}
        {dayjs(event.end).format("MM/DD/YYYY")}
      </div>
      <span className="text-xs truncate w-full text-left" title={event.name}>
        {event.name}
      </span>
    </div>
  );
};
