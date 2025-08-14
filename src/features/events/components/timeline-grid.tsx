import { DndContext } from "@dnd-kit/core";
import { useEvents } from "../hooks/use-events";
import dayjs from "dayjs";
import { EventBar } from "./event-bar";

const TIMELINE_ROW_HEIGHT = 60;
const GRID_START_INDEX = 1;
const HEADER_ROW_INDEX = 0;

export const TimelineGrid = () => {
  const { lanes, dateColumns, updateEventName } = useEvents();

  // Calculate grid template columns based on number of date columns
  const gridTemplateColumns = `repeat(${dateColumns.length}, 1fr)`;

  // Calculate grid template rows: 1 for header + number of lanes
  const gridTemplateRows = `auto repeat(${lanes.length}, minmax(${TIMELINE_ROW_HEIGHT}px, auto))`;

  return (
    <DndContext>
      <div
        className="grid gap-0 bg-white border border-slate-300"
        style={{
          gridTemplateColumns,
          gridTemplateRows,
        }}
      >
        {Array.from({ length: lanes.length + 1 }, (_, rowIndex) =>
          dateColumns.map((date, colIndex) => (
            <div
              key={`grid-${rowIndex}-${colIndex}`}
              className={`border-r border-b border-slate-100 ${
                rowIndex === HEADER_ROW_INDEX
                  ? "p-2 text-center bg-gray-100 text-sm font-medium"
                  : `min-h-[${TIMELINE_ROW_HEIGHT}px] bg-white`
              }`}
              style={{
                gridColumn: colIndex + GRID_START_INDEX,
                gridRow: rowIndex + GRID_START_INDEX,
              }}
            >
              {rowIndex === HEADER_ROW_INDEX ? date : ""}
            </div>
          ))
        )}

        {/* Event lanes with spanning events */}
        {lanes.map((lane, laneIndex) =>
          lane.map((event) => {
            // Get the starting column index for this event
            const formattedStartDate = dayjs(event.start).format("MM/DD/YYYY");
            const startColIndex = dateColumns.findIndex(
              (date) => date === formattedStartDate
            );
            const startCol =
              startColIndex >= 0
                ? startColIndex + GRID_START_INDEX
                : GRID_START_INDEX;
            const span = event.diffDays || GRID_START_INDEX; // Default to 1 day

            return (
              <div
                key={`event-${event.id}`}
                className={`min-h-[${TIMELINE_ROW_HEIGHT}px] flex flex-col gap-1 z-10 relative`}
                style={{
                  gridColumn: `${startCol} / span ${span}`,
                  gridRow: laneIndex + GRID_START_INDEX + 1, // +1 because header takes row 1
                }}
              >
                <EventBar event={event} updateEventName={updateEventName} />
              </div>
            );
          })
        )}
      </div>
    </DndContext>
  );
};
