import { DateTime } from "luxon";
import http from "./http.service";
import convert from "./camel.service";

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
    let datetime = `${date} ${time}`;
    let format = "yyyy-MM-dd HH:mm";
    if (timeZone !== "local") {
      datetime += ` ${timeZone}`;
      format += " z";
    }
    console.log("datetime", datetime);
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

export default { createEvent };
