import { RootState, UserState } from "./types";

export const getters = {
  user: (state: RootState) => (): UserState | undefined => state.user,
};
export default getters;
