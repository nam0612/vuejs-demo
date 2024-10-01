import httpClient from "@/common/httpClient";

const state = () => ({
  products: [],
  isLoading: true,
  total: 0,
  query: {},
});

const getters = {
  products(state) {
    return state.products;
  },
  isLoading(state) {
    return state.isLoading;
  },
  total(state) {
    return state.total;
  },
  query(state) {
    return state.query;
  },
};

const actions = {
  async fetchProducts({ commit }, searchRequest) {
    await httpClient.post("/get-product", searchRequest).then((response) => {
      if (response.status === 200 && response.data.data) {
        console.log(response);
        commit("FETCH_END", {
          productsData: response.data.data.items,
          total: response.data.data.total,
        });
      }
    });
  },
};

const mutations = {
  FETCH_END(state, { productsData, total }) {
    state.products = productsData;
    state.total = total;
    state.isLoading = false;
  },
  SET_QUERY(state, query) {
    state.query = query;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
