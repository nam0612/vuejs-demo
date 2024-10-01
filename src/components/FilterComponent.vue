<template>
  <div class="search-controls">
    <v-text-field
      @change="updateQuery('name', searchName)"
      v-model="searchName"
      label="Enter Product Name"
      prepend-icon="mdi-magnify"
      outlined
    ></v-text-field>

    <v-select
      @change="updateQuery('type', searchType)"
      v-model="searchType"
      :items="typeOptions"
      label="Select Type"
      outlined
    ></v-select>

    <v-text-field
      @change="updateQuery('minPrice', minPrice)"
      v-model="minPrice"
      label="Min"
      type="number"
      outlined
    ></v-text-field>

    <span>-</span>

    <v-text-field
      @change="updateQuery('maxPrice', maxPrice)"
      v-model="maxPrice"
      label="Max"
      type="number"
      outlined
    ></v-text-field>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "FilterComponent",
  data() {
    return {
      searchType: this.$route.query.type || "facility",
      searchName: this.$route.query.name || "",
      minPrice: Number(this.$route.query.minPrice) || 0,
      maxPrice: Number(this.$route.query.maxPrice) || 999990,
      typeOptions: ["service", "facility"],
    };
  },
  mounted() {
    this.searchProducts();
  },
  methods: {
    debouncedSearchProducts: _.debounce(function () {
      this.searchProducts();
    }, 500),
    searchProducts() {
      this.$emit("search", {
        type: this.searchType,
        name: this.searchName,
      });
    },
    updateQuery(param, value) {
      const query = { ...this.$route.query, [param]: value };
      this.$router.push({ query });
      this.searchProducts();
    },
  },
  watch: {
    "$route.query": {
      handler(newQuery) {
        this.searchType = newQuery.type || "facility";
        this.searchName = newQuery.name || "";
        this.minPrice = Number(newQuery.minPrice) || 0;
        this.maxPrice = Number(newQuery.maxPrice) || 999990;
        this.$store.commit("products/SET_QUERY", newQuery);
        this.searchProducts();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.search-controls {
  display: flex;
  align-items: center;
  margin-top: 5rem;
}

.search-controls > * {
  margin-right: 1rem;
}
</style>
