import { DateTime } from "luxon";
import { Ref, ref } from "vue";

export enum SupportedTimeZones {
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

const useTime = (defaultZone: SupportedTimeZones = SupportedTimeZones.est): UseTime => {
  const timeZones = ref(["est", "pst", "cst", "mst", "utc"] as SupportedTimeZones[]);
  const dateNow = ref(DateTime.now().setZone(defaultZone));

  return {
    timeZones,
    dateNow,
  };
};

export default useTime;
