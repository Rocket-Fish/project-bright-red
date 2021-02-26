// prettier-ignore
import {
  computed,
  Ref,
  ref,
  ComputedRef,
} from "vue";

export interface UseError {
  error: Ref<string>;
  containsError: ComputedRef<boolean>;
}

const useIsLoading = (): UseError => {
  const error = ref("");
  const containsError = computed(() => error.value !== "");

  return { error, containsError };
};

export default useIsLoading;
