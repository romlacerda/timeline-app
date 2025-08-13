import { EventBar } from "./event-bar";

export const Lane = ({ events }: { events: Event[] }) => {
  return (
    <div className="flex flex-col border-r border-gray-200 border-y h-[calc(100vh-100px)] gap-y-0.5">
      {events.map((event) => (
        <EventBar key={event.id} event={event} />
      ))}
    </div>
  );
};
