import { DateTime } from "luxon";
import http from "./http.service";
import convert from "./camel.service";

export interface Event {
  autoFormParty: boolean;
  id: number;
  maxPlayersInQueue: number;
  name: string;
  numberOfParties: number;
  timeZone: string;
  url: string;
  createdAt: DateTime;
  eventTime: DateTime;
  updatedAt: DateTime;
  organizer: {
    id: number;
    displayName: string;
  };
}
export interface EventConfig {
  name: string;
  numberOfParties: number;
  maxPlayersInQueue: number;
  time: string;
  date: string;
  autoFormParty: boolean;
  timeZone: string;
}

export const createEvent = async (config: EventConfig) => {
  const generateUtcIsoString = ({ timeZone, time, date }: EventConfig) => {
    const datetime = `${date} ${time} ${timeZone}`;
    const format = "yyyy-MM-dd HH:mm z";
    return DateTime.fromFormat(datetime, format)
      .toUTC()
      .toISO();
  };
  const { data } = await http.post("event", {
    ...config,
    eventTime: generateUtcIsoString(config),
  });
  return convert(data);
};

export const getEvent = async (url: string): Promise<Event> => {
  const { data } = await http.get("event", {
    params: {
      url,
    },
  });

  const { createdAt, eventTime, updatedAt, ...restOfEvent } = convert(data);

  return {
    ...restOfEvent,
    createdAt: DateTime.fromISO(createdAt),
    eventTime: DateTime.fromISO(eventTime, { zone: "utc" }),
    updatedAt: DateTime.fromISO(updatedAt),
  };
};

export interface EventQueueConfig {
  forEvent: number;
  roles: string;
}

export interface Candidate {
  id: number;
  forEvent: number;
  roles: string[];
  partyId?: number | null;
  userId: number;
  createdAt: DateTime;
  updatedAt: DateTime;
}

const parseEventData = (data: any): Candidate => {
  const rawData = convert(data);
  try {
    return {
      ...rawData,
      roles: JSON.parse(rawData.roles),
      createdAt: DateTime.fromISO(rawData.createdAt),
      updatedAt: DateTime.fromISO(rawData.updatedAt),
    };
  } catch (e) {
    throw {
      errors: [
        {
          message: "Cannot parse JSON from server, something went very wrong.",
        },
      ],
    };
  }
};

export const getMyQueuePosition = async (eventId: number): Promise<Candidate> => {
  const { data } = await http.get("event/queue", { params: { forEvent: eventId } });
  return parseEventData(data);
};

export const joinEventQueue = async (config: EventQueueConfig): Promise<Candidate> => {
  const { data } = await http.post("event/queue", config);
  return parseEventData(data);
};

export const leaveEventQueue = async (eventId: number) => {
  const { data } = await http.delete("event/queue", { params: { forEvent: eventId } });
  return data;
};

export default { createEvent };
