<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!-- <v-toolbar>
          <v-btn text @click="goToHome">← Back to List</v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title>Product Detail</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text @click="logOut">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-toolbar> -->
        <NavbarComponent title="Product Detail">
          <v-btn text @click="goToHome">← Back to List</v-btn>
        </NavbarComponent>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-media>
            <v-img :src="product.image" height="300px" />
          </v-card-media>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Edit Product</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="product.name"
                label="Product Name"
                required
              ></v-text-field>

              <v-select
                v-model="product.type"
                :items="productTypes"
                label="Product Type"
                required
              ></v-select>

              <v-text-field
                v-model="product.price"
                :value="formattedPrice"
                label="Price"
                type="text"
                required
                @input="updatePrice"
              ></v-text-field>

              <v-text-field
                v-model="product.image"
                label="Image URL"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <div v-if="product.id === null || product.id === undefined">
              <v-btn color="green" @click="addProduct(product)">Add</v-btn>
              <v-btn color="grey" @click="goToHome">Cancel</v-btn>
            </div>
            <div v-else>
              <v-btn
                color="red"
                @click="deleteProduct(product.id, product.name, product.image)"
                >Delete</v-btn
              >
              <v-btn color="blue" @click="saveProduct(product)">Save</v-btn>
              <v-btn color="grey" @click="goToHome">Cancel</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import NavbarComponent from "@/components/Navbar.vue";

export default {
  name: "ProductDetail",
  components: { NavbarComponent },
  data() {
    return {
      productTypes: ["facility", "service"],
      isEnabled: false,
    };
  },
  computed: {
    ...mapGetters("product", ["product"]),
    ...mapGetters("products", ["query"]),
    formattedPrice() {
      console.log("Test Getter", this.product);
      if (this.product.price === null || this.product.price === undefined) {
        return new Intl.NumberFormat("en-US").format(0);
      }
      return new Intl.NumberFormat("en-US").format(this.product.price);
    },
  },
  methods: {
    goToHome() {
      this.$router.push({
        name: "products",
        query: {
          page: this.query.page,
          size: this.query.size,
          name: this.query.name,
          type: this.query.type,
        },
      });
    },

    logOut() {
      this.$store
        .dispatch("auth/logOut")
        .then(() => this.$router.go(-1))
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(productId, productName, productImageUrl) {
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
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("product/deleteProduct", productId)
            .catch((err) => {
              console.log(err);
            });
          this.$router.push({ name: "products" });
        }
      });
    },
    async saveProduct(product) {
      const payload = {
        filter: {
          id: product.id,
        },
        updateData: {
          name: product.name,
          type: product.type,
          price: product.price,
          image: product.image,
        },
      };
      await this.$store
        .dispatch("product/updateProductDetails", payload)
        .catch((err) => {
          console.log(err);
        });
      this.$router.push({ name: "products" });
    },
    cancel() {
      this.$router.push({ name: "products" });
    },
    async addProduct(product) {
      const payload = {
        items: [product],
      };
      await this.$store.dispatch("product/createProduct", payload);
      this.$router.push({ name: "products" });
    },
    editProduct() {
      console.log("Product edited");
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
  height: auto;
}
</style>
