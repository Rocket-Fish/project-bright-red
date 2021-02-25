export interface UserState {
  displayName: string;
  anonymousId?: string;
  anonymousKey?: string;
}
export interface RootState {
  user?: UserState;
}

export const ActionTypes = {
  SET_USER: "SET_USER",
};
