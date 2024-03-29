import createPersistedState from "vuex-persistedstate";
import { createStore, Plugin } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { RootState } from "./types";
import { getters } from "./getters";
import { saveJWT } from "../services/http.service";

const plugins = [] as Plugin<RootState>[];
if (typeof window !== "undefined") {
  const vuexLocalstorage = createPersistedState({
    key: "theCatAteTheFish",
    storage: window.localStorage,
    rehydrated(store) {
      if (store.getters.isLoggedIn) {
        saveJWT(store.getters.getJWT);
      }
    },
  });
  plugins.push(vuexLocalstorage);
}

const initialState = {} as RootState;

export default createStore({
  state: initialState,
  mutations,
  getters,
  actions,
  modules: {}, // no modules yet
  plugins,
});
