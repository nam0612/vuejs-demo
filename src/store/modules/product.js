import httpClient from "@/common/httpClient";
import Swal from "sweetalert2";

const state = () => ({
  product: {},
  type: "",
  isLoading: false,
});

const getters = {
  product(state) {
    return state.product;
  },
};

const actions = {
  resetData({ commit }) {
    commit("SET_PRODUCT", {});
  },
  fetchProduct({ commit }, product) {
    commit("SET_PRODUCT", product);
  },
  createProduct({ commit }, payload) {
    return new Promise((resolve, reject) => {
      httpClient
        .post("/create-product", payload)
        .then((response) => {
          if (response.status === 200) {
            commit("PUBLISH_SUCCESS");
            resolve(response);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  deleteProduct({ commit }, productId) {
    const payload = {
      filter: {
        id: productId,
      },
    };
    console.log("Deleting product with ID:", payload);
    return new Promise((resolve, reject) => {
      const url = "/delete-product";
      httpClient
        .delete(url, {
          data: payload,
        })
        .then((response) => {
          commit("DELETE_SUCCESS");
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  updateProductDetails({ commit }, product) {
    return new Promise((resolve, reject) => {
      const url = "/update-product";
      httpClient
        .post(url, product)
        .then((response) => {
          if (response.status === 200) {
            commit("UPDATE_SUCCESS");
            resolve(response);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};

const mutations = {
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  PUBLISH_SUCCESS() {
    Swal.fire({
      width: 400,
      position: "top-end",
      icon: "success",
      title: "Created Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  },
  DELETE_SUCCESS() {
    Swal.fire({
      width: 400,
      position: "top-end",
      icon: "success",
      title: "Deleted successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
  },
  UPDATE_SUCCESS(state) {
    state.isLoading = false;
    Swal.fire({
      width: 400,
      position: "top-end",
      icon: "success",
      title: "Update Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
