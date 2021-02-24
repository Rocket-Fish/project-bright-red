import { ActionContext } from "vuex";
import { UserState, RootState, ActionTypes } from "./types";

export const actions = {
  setUser({ commit }: ActionContext<RootState, RootState>, payload: UserState) {
    commit(ActionTypes.SET_USER, payload);
  },
};
export default actions;
