import { RootState, UserState } from "./types";

export const getters = {
  user: (state: RootState): UserState | undefined => state.user,
  // prettier-ignore
  isLoggedIn: (state: RootState): boolean => (!!state.user && state.user.isLoggedIn),
  getJWT: (state: RootState): string => (state.user ? state.user.jwt : ""),
};

export default getters;
