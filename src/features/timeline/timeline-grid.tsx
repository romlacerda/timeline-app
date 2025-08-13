import { EventBar } from "./components/event-bar";
import { useEvents } from "./hooks/use-events";

export const TimelineGrid = () => {
  const { events } = useEvents();

  return (
    <div>
      {events.map((event) => (
        <EventBar key={event.id} event={event} />
      ))}
    </div>
  );
};
