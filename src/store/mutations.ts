import { RootState, UserState, ActionTypes } from "./types";

export const mutations = {
  [ActionTypes.SET_USER]: (state: RootState, payload?: UserState) => {
    state.user = payload;
  },
};

export default mutations;
