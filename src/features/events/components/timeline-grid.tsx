import { DndContext } from "@dnd-kit/core";
import { useEvents } from "../hooks/use-events";
import dayjs from "dayjs";
import { EventBar } from "./event-bar";

export const TimelineGrid = () => {
  const { lanes, dateColumns, updateEventName } = useEvents();

  // Calculate grid template columns based on number of date columns
  const gridTemplateColumns = `repeat(${dateColumns.length}, 1fr)`;

  // Calculate grid template rows: 1 for header + number of lanes
  const gridTemplateRows = `auto repeat(${lanes.length}, minmax(60px, auto))`;

  return (
    <DndContext>
      <div
        className="grid gap-px bg-gray-300"
        style={{
          gridTemplateColumns,
          gridTemplateRows,
        }}
      >
        {/* Header row with dates */}
        {dateColumns.map((date, colIndex) => (
          <div
            key={`header-${date}`}
            className={`p-2 text-center bg-gray-100 text-sm font-medium col-[${
              colIndex + 1
            }] row-[1]`}
          >
            {date}
          </div>
        ))}

        {/* Event lanes */}
        {lanes.map((lane, laneIndex) =>
          dateColumns.map((date, colIndex) => {
            // Find events in this lane for this date
            const eventsForDateAndLane = lane.filter(
              (event) => dayjs(event.start).format("MM/DD/YYYY") === date
            );

            return (
              <div
                key={`lane-${laneIndex}-col-${colIndex}`}
                className={`bg-white p-1 min-h-[60px] flex flex-col gap-1 col-[${
                  colIndex + 1
                }] row-[${laneIndex + 2}]`}
              >
                {eventsForDateAndLane.map((event) => (
                  <EventBar
                    key={event.id}
                    event={event}
                    updateEventName={updateEventName}
                  />
                ))}
              </div>
            );
          })
        )}
      </div>
    </DndContext>
  );
};
