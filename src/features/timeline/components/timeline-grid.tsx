import { DndContext } from "@dnd-kit/core";
import { useEvents } from "../hooks/use-events";
import "./timeline-grid.css";
import dayjs from "dayjs";
import { EventBar } from "./event-bar";

export const TimelineGrid = () => {
  const { lanes, dateColumns, updateEventName } = useEvents();

  return (
    <DndContext>
      <div id="timeline-grid">
        <div className="flex w-full border-b border-gray-300">
          {dateColumns.map((date) => {
            return (
              <div className="flex flex-col">
                <div
                  key={date}
                  className="flex-1 p-2 text-center bg-gray-100 border-r border-gray-200 text-sm font-medium"
                >
                  {date}
                </div>

                {lanes.map((lane, index) => {
                  return (
                    <div key={index}>
                      {lane.map((event) => {
                        if (dayjs(event.start).format("MM/DD/YYYY") === date) {
                          return (
                            <EventBar
                              event={event}
                              updateEventName={updateEventName}
                            />
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};
