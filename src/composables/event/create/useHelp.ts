import { Ref, ref } from "vue";

export interface FieldsToHelp {
  [k: string]: Help;
}
export interface Help {
  isError: boolean;
  error: string;
  help: string;
}

export interface UseHelp {
  fieldsToHelp: Ref<FieldsToHelp>;
  getHelpText: Function;
  resetErrors: Function;
}

const useHelp = (): UseHelp => {
  const fieldsToHelp = ref({
    name: {
      isError: false,
      error: "Name is required, and can have a maximum of 50 characters",
      help: "",
    },
    numberOfParties: {
      isError: false,
      error:
        "IDK how you selected this option but only 1 3 6 and 7 parties are supported at the moment",
      help: "",
    },
    maxPlayersInQueue: {
      isError: false,
      error: "This number must be between 8 and 128",
      help: "Allow a maximum of N players in queue",
    },
    eventTime: {
      isError: false,
      error: "Unless you have a time machine, you cannot select a time in the past",
      help: "Note: Safari and IE does not support input date/time.",
    },
  } as FieldsToHelp);
  const getHelpText = ({ isError, error, help }: Help): string => (isError ? error : help);
  const resetErrors = (): void => {
    fieldsToHelp.value = Object.entries(fieldsToHelp.value).reduce(
      (acc: FieldsToHelp, [key, value]) => {
        acc[key] = { ...value, isError: false } as Help;
        return acc;
      },
      {} as FieldsToHelp,
    );
  };

  return {
    fieldsToHelp,
    getHelpText,
    resetErrors,
  };
};

export default useHelp;
