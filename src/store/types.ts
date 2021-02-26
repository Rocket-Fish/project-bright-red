export interface UserState {
  isLoggedIn: boolean;
  displayName: string;
  jwt: string;
  anonymousId?: string;
  anonymousKey?: string;
}
export interface RootState {
  user?: UserState;
}

export const ActionTypes = {
  SET_USER: "SET_USER",
};
