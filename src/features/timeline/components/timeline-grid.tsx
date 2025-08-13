import { Lane } from "./lane";
import { useEvents } from "../hooks/use-events";

import "./timeline-grid.css";

export const TimelineGrid = () => {
  const { lanes } = useEvents();

  return (
    <div id="timeline-grid">
      {lanes.map((lane) => (
        <Lane key={lane.id} events={lane} />
      ))}
    </div>
  );
};
