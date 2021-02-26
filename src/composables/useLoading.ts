import { Ref, ref } from "vue";

export interface UseIsLoading {
  isLoading: Ref<boolean>;
}

const useIsLoading = (initalValue = false): UseIsLoading => {
  const isLoading = ref(initalValue);

  return { isLoading };
};

export default useIsLoading;
