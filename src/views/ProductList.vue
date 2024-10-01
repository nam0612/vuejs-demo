<!-- <template>
  <v-container class="scrollable-container">
    <NavbarComponent title="Product List" />
    <v-row>
      <v-col cols="10">
        <span class="text-h5">Product Management</span>
        <span class="text-h5 grey--text"> ({{ products.length }})</span>
        <div class="ml-2 d-inline"></div>
      </v-col>
      <v-col cols="2">
        <v-btn color="blue" @click="addProduct"> Add New Product </v-btn>
      </v-col>
    </v-row>

    <FilterComponent @search="searchProducts" />
    <v-row class="hidden-sm-and-down mt-1">
      <v-col class="text-center" cols="1">No</v-col>
      <v-col class="text-left" cols="3">Product Name </v-col>
      <v-col class="text-left" cols="2">Product Type </v-col>
      <v-col class="text-left" cols="2">Price (VND)</v-col>
      <v-col class="text-left" cols="2">Actions</v-col>
    </v-row>

    <v-skeleton-loader
      v-if="isLoading"
      type="table-tbody@3"
      width="100%"
    ></v-skeleton-loader>

    <v-card
      v-for="(product, index) in products"
      :key="product.id"
      class="pa-1 my-2"
      outlined
    >
      <v-row>
        <v-col cols="1" class="text-center">
          <v-row class="hidden-md-and-up">
            <v-col class="text-caption">No</v-col>
          </v-row>
          {{ index + 1 }}
        </v-col>
        <v-col cols="3">
          <v-row class="hidden-md-and-up">
            <v-col class="text-caption">Product Name</v-col>
          </v-row>
          {{ product.name }}
        </v-col>
        <v-col cols="2">
          <v-row class="hidden-md-and-up">
            <v-col class="text-caption">Product Type</v-col>
          </v-row>
          {{ product.type }}
        </v-col>
        <v-col cols="3" md="2">
          <v-row class="hidden-md-and-up">
            <v-col class="text-caption">Price (VND)</v-col>
          </v-row>
          {{ formatNumber(product.price) }}
        </v-col>
        <v-col md="1">
          <v-icon
            @click="deleteProduct(product.id, product.name, product.image)"
            >mdi-delete</v-icon
          >
          <v-icon class="ml-1" @click="goToProductDetail(product)"
            >mdi-pencil</v-icon
          >
        </v-col>
      </v-row>
    </v-card>
    <div class="pagination-controls">
      <div class="pagination">
        <label for="itemsPerPage">Items per page:</label>
        <select v-model="itemsPerPage" @change="updatePagination">
          <option v-for="option in itemsOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </v-container>
</template> -->
<template>
  <v-container class="scrollable-container">
    <NavbarComponent title="Product List" />
    <v-row align-content="center" justify="space-between">
      <v-col cols="10" md="10">
        <span class="text-h5">Product Management</span>
        <span class="text-h5 grey--text"> ({{ products.length }})</span>
      </v-col>
      <v-col cols="2" md="2" class="d-flex justify-end">
        <v-btn color="blue" @click="addProduct"> Add New Product </v-btn>
      </v-col>
    </v-row>

    <FilterComponent @search="searchProducts" />

    <v-row class="d-none d-md-flex">
      <v-col cols="2">No</v-col>
      <v-col cols="4">Product Name</v-col>
      <v-col cols="2">Product Type</v-col>
      <v-col cols="2">Price (VND)</v-col>
      <v-col cols="2">Actions</v-col>
    </v-row>

    <v-skeleton-loader
      v-if="isLoading"
      type="table-tbody@3"
      class="my-skeleton"
      width="100%"
    ></v-skeleton-loader>

    <v-card
      v-for="(product, index) in products"
      :key="product.id"
      class="pa-1 my-2"
      outlined
    >
      <v-row>
        <v-col cols="2"> {{ index + 1 }} </v-col>
        <v-col cols="4"> {{ product.name }} </v-col>
        <v-col cols="2"> {{ product.type }} </v-col>
        <v-col cols="2"> {{ formatNumber(product.price) }} </v-col>
        <v-col cols="2">
          <v-icon
            @click="deleteProduct(product.id, product.name, product.image)"
            >mdi-delete</v-icon
          >
          <v-icon class="ml-1" @click="goToProductDetail(product)"
            >mdi-pencil</v-icon
          >
        </v-col>
      </v-row>
    </v-card>

    <div class="pagination-controls">
      <div class="pagination">
        <label for="itemsPerPage">Items per page:</label>
        <select v-model="itemsPerPage" @change="updatePagination">
          <option v-for="option in itemsOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import NavbarComponent from "@/components/Navbar.vue";
import FilterComponent from "@/components/FilterComponent.vue";
export default {
  name: "productsList",
  components: { NavbarComponent, FilterComponent },
  data() {
    return {
      itemsOptions: [5, 10, 20, 50],
      items: [],
      dataSearch: {},
    };
  },
  mounted() {
    this.dataSearch = {
      name: this.$route.query.name || "",
      type: this.$route.query.type || "facility",
    };
    this.searchProducts(this.dataSearch);
  },
  methods: {
    searchProducts(data) {
      this.currentPage = 1;
      this.fetchProducts(data);
    },
    updatePagination(event) {
      this.currentQuery.size = event.target.value;
      this.currentQuery.page = 1;
      this.callRouter(this.currentQuery);
      this.fetchProducts(this.dataSearch);
    },
    fetchProducts(data) {
      const productRequest = {
        page: this.currentPage - 1,
        size: this.itemsPerPage,
        data: {
          name: this.$route.query.name || data.name,
          type: this.$route.query.type || data.type,
        },
      };
      this.$store.dispatch("products/fetchProducts", productRequest);
    },
    deleteProduct(productId, productName, productImageUrl) {
      console.log("Delete product", productId);

      Swal.fire({
        title: "Bạn chắc chắn muốn xóa sản phẩm này chứ?",
        text: productName,
        imageUrl: productImageUrl,
        imageHeight: 135,
        showDenyButton: true,
        confirmButtonText: `Yes`,
        confirmButtonColor: "#052949",
        denyButtonText: "No",
        denyButtonColor: "#c52033",
        customClass: {
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("product/deleteProduct", productId);
          await this.fetchProducts(this.dataSearch);
        }
      });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentQuery.page++;
        this.callRouter(this.currentQuery);
        this.fetchProducts(this.dataSearch);
      }
    },
    callRouter(query) {
      this.$router.push({ query }).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          console.error("Navigation error:", err);
        }
      });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentQuery.page--;
        this.callRouter(this.currentQuery);
        this.fetchProducts(this.dataSearch);
      }
    },
    formatNumber(value) {
      return new Intl.NumberFormat("en-US").format(value);
    },
    goToProductDetail(product) {
      const query = {
        page: this.currentPage || 1,
        size: this.itemsPerPage || 10,
        type: this.$route.query.type || "facility",
        name: this.$route.query.name || "",
      };
      this.$store.dispatch("product/fetchProduct", product);
      this.$store.commit("products/SET_QUERY", query);
      this.$router.push({
        name: "productDetail",
      });
    },
    addProduct() {
      this.$store.dispatch("product/resetData");
      this.$router.push({ name: "productDetail" });
    },
  },
  computed: {
    ...mapGetters("products", ["products", "isLoading", "total"]),
    totalPages() {
      return Math.ceil(this.total / this.itemsPerPage);
    },

    currentQuery() {
      return {
        page: this.currentPage,
        size: this.itemsPerPage,
        type: this.$route.query.type || "facility",
        name: this.$route.query.name || "",
      };
    },
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    itemsPerPage() {
      return parseInt(this.$route.query.size) || 10;
    },
  },
};
</script>

<style scoped>
.rm-underline {
  text-decoration: none;
}

button {
  margin: 0 5px;
}
.pagination-controls {
  display: flex;
  margin-bottom: 1rem;
  margin-left: auto;
}

.pagination-controls select {
  width: 50px;
  text-align: center;
  background-color: blueviolet;
}
.pagination {
  margin-left: auto;
}

.search-controls {
  display: flex;
  align-items: center;
  margin-top: 5rem;
}

.search-controls > * {
  margin-right: 1rem;
}
.scrollable-container {
  max-height: 1000px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}
@media (max-width: 600px) {
  .my-skeleton {
    height: 150px; /* Thay đổi chiều cao cho thiết bị nhỏ */
  }
}
</style>
