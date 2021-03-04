export interface UserState {
  id: number;
  isLoggedIn: boolean;
  displayName: string;

  jwt: string;
  jwtExp: string;
}
export interface RootState {
  user?: UserState;
}

export const ActionTypes = {
  SET_USER: "SET_USER",
};
