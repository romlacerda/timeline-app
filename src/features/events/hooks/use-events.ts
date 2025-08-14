import dayjs from "dayjs";
import { useState, useMemo, useCallback } from "react";
import type { Event } from "../types";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getDatesInRange } from "../utils";

dayjs.extend(isSameOrBefore);

const mockEvents = [
  {
    id: 1,
    start: "2021-01-01",
    end: "2021-01-05",
    name: "First item"
  },
  {
    id: 2,
    start: "2021-01-02",
    end: "2021-01-08",
    name: "Second item"
  },
  {
    id: 3,
    start: "2021-01-06",
    end: "2021-01-13",
    name: "Another item"
  },
  {
    id: 4,
    start: "2021-01-14",
    end: "2021-01-14",
    name: "Another item"
  },
  {
    id: 5,
    start: "2021-02-01",
    end: "2021-02-15",
    name: "Third item"
  },
  {
    id: 6,
    start: "2021-01-12",
    end: "2021-02-16",
    name: "Fourth item with a super long name"
  },
  {
    id: 7,
    start: "2021-02-01",
    end: "2021-02-02",
    name: "Fifth item with a super long name"
  },
  {
    id: 8,
    start: "2021-01-03",
    end: "2021-01-05",
    name: "First item"
  },
  {
    id: 9,
    start: "2021-01-04",
    end: "2021-01-08",
    name: "Second item"
  },
  {
    id: 10,
    start: "2021-01-06",
    end: "2021-01-13",
    name: "Another item"
  },
  {
    id: 11,
    start: "2021-01-09",
    end: "2021-01-09",
    name: "Another item"
  },
  {
    id: 12,
    start: "2021-02-01",
    end: "2021-02-15",
    name: "Third item"
  },
  {
    id: 13,
    start: "2021-01-12",
    end: "2021-02-16",
    name: "Fourth item with a super long name"
  },
  {
    id: 14,
    start: "2021-02-01",
    end: "2021-02-02",
    name: "Fifth item with a super long name"
  }
];

const INCLUSIVE_DAY_COUNT = 1;

export const useEvents = () => {
  // TODO: Add a hook to fetch events from the backend and add events to the state
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const updateEventName = (eventId: number, newName: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, name: newName }
          : event
      )
    );
  };


  const assignLanes = useCallback(() => {

    const lanesList: Event[][] = [];

    const sortedEvents = [...events].sort((a, b) => 
      dayjs(a.start).diff(dayjs(b.start))
    );

    for (let i = 0; i < sortedEvents.length; i++) {
        const event = sortedEvents[i];
      
        if (lanesList.length === 0) {
          lanesList.push([{ ...event, diffDays: dayjs(event.end).diff(dayjs(event.start), 'day') + INCLUSIVE_DAY_COUNT }]);
        } else {
          for (let j = 0; j < lanesList.length; j++) {
            const lastEventInLane = lanesList[j][lanesList[j].length - 1];
            const lastEventEnd = dayjs(lastEventInLane.end);
            if (dayjs(event.start).isAfter(lastEventEnd)) {
              lanesList[j].push({ ...event, diffDays: dayjs(event.end).diff(dayjs(event.start), 'day') + INCLUSIVE_DAY_COUNT });
              break;
            } else {
              lanesList.push([{ ...event, diffDays: dayjs(event.end).diff(dayjs(event.start), 'day') + INCLUSIVE_DAY_COUNT }]);
              break;
            }
          }
        }
    }

    return lanesList;
  }, [events]);

  const lanes = useMemo(() => assignLanes(), [assignLanes]);

  return { events, lanes, updateEventName, dateColumns: getDatesInRange(
    events.length > 0 ? events[0].start : dayjs().format("YYYY-MM-DD"), 
    events.length > 0 ? events[events.length - 1].end : dayjs().format("YYYY-MM-DD")
  ) };
};