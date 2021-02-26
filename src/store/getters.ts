import { RootState, UserState } from "./types";

export const getters = {
  user: (state: RootState) => (): UserState | undefined => state.user,
  isLoggedIn: (state: RootState) => (): boolean => !!state.user && state.user.isLoggedIn,
};
export default getters;
