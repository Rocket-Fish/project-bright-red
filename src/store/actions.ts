import { ActionContext } from "vuex";
import { UserState, RootState, ActionTypes } from "./types";
import { saveJWT, removeJWT } from "../services/http.service";

export const actions = {
  setUser({ commit }: ActionContext<RootState, RootState>, payload: UserState) {
    saveJWT(payload.jwt);
    commit(ActionTypes.SET_USER, payload);
  },
  logoutUser({ commit }: ActionContext<RootState, RootState>) {
    removeJWT();
    commit(ActionTypes.SET_USER, undefined);
  },
};
export default actions;
