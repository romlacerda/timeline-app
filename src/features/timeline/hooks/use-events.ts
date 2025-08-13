import dayjs from "dayjs";
import { useState, useMemo, useCallback } from "react";
import type { Event } from "../types";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { getDatesInRange } from "../utils";

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

dayjs.extend(isSameOrBefore);

export const useEvents = () => {
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
      
        const currentEnd = dayjs(event.end);
        const nextStart = dayjs(sortedEvents[i + 1]?.start);

        if (lanesList.length === 0) {
          lanesList.push([event]);
        } else {
          for (let j = 0; j < lanesList.length; j++) {
            if (nextStart.isAfter(currentEnd)) {
              lanesList[j].push(event);
              break;
            } else {
              lanesList.push([event]);
              break;
            }
          }
        }
    }

    return lanesList;
  }, [events]);

  const lanes = useMemo(() => assignLanes(), [assignLanes]);

  return { events, lanes, updateEventName, dateColumns: getDatesInRange(events[0].start, events[events.length - 1].end) };
};