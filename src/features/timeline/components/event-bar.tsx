import dayjs from "dayjs";
import type { Event } from "../types";

const availableColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-emerald-500",
] as const;

type Props = {
  event: Event;
};

export const EventBar = ({ event }: Props) => {
  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  return (
    <div
      className={`${randomColor} flex text-left p-2 text-xs flex-col rounded-lg
        w-52
      `}
    >
      {dayjs(event.start).format("MM/DD/YYYY")} -{" "}
      {dayjs(event.end).format("MM/DD/YYYY")}
      <span className="truncate text-ellipsis max-w-48">{event.name}</span>
    </div>
  );
};
