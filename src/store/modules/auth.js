import httpClient from "@/common/httpClient";

const state = () => ({
  status: "",
  token: localStorage.getItem("token") || "",
  displayName: localStorage.getItem("displayName") || "",
});

const getters = {
  isLoggedIn: (state) => !!state.token,
  authStatus: (state) => state.status,
  displayName: (state) => state.displayName,
  token: (state) => state.token,
};

const actions = {
  logIn({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      httpClient
        .post("/users/authenticate", user)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            const token = response.data.token;
            const displayName = response.data.name;
            localStorage.setItem("token", token);
            localStorage.setItem("displayName", displayName);
            httpClient.defaults.headers.common["Authorization"] =
              "Bearer " + token;
            commit("auth_success", { token, displayName });
            resolve(response);
          }
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logOut({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    delete httpClient.defaults.headers.common["Authorization"];
  },
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_error(state) {
    state.status = "error";
  },
  auth_success(state, { token, displayName }) {
    state.status = "success";
    state.token = token;
    state.displayName = displayName;
  },
  logout(state) {
    state.token = "";
    state.displayName = "";
    state.status = "";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
