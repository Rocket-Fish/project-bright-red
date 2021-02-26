import VuexPersist from "vuex-persist";
import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { RootState } from "./types";
import { getters } from "./getters";

const vuexLocalstorage = new VuexPersist<RootState>({
  key: "theCatAteTheFish",
  storage: window.localStorage,
});

const initialState = {} as RootState;

export default createStore({
  state: initialState,
  mutations,
  getters,
  actions,
  modules: {}, // no modules yet
  plugins: [vuexLocalstorage.plugin],
});
