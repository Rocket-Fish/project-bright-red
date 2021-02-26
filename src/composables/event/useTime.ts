import { DateTime } from "luxon";
import { Ref, ref } from "vue";

export enum SupportedTimeZones {
  local = "local",
  utc = "utc",
  est = "est",
  pst = "pst",
  cst = "cst",
  mst = "mst",
}

export interface UseTime {
  timeZones: Ref<SupportedTimeZones[]>;
  dateNow: Ref<DateTime>;
}

const useTime = (defaultZone: SupportedTimeZones = SupportedTimeZones.local): UseTime => {
  const timeZones = ref(["local", "est", "pst", "cst", "mst", "utc"] as SupportedTimeZones[]);
  const dateNow = ref(DateTime.now().setZone(defaultZone));

  return {
    timeZones,
    dateNow,
  };
};

export default useTime;
