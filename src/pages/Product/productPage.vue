<template>
  <v-container>
    <v-layout wrap style="justify-content: center;">
      <child
        v-for="(product, id) in products"
        :key="product.id"
        :product="product"
        :id="id"
      />

      <div v-if="loading" class="loader">
        <loader></loader>
      </div>
      <div
        v-else-if="statusMessage"
        class="statusMessage"
        style="justify-content:center"
      >
        <h3>{{ statusMessage }}</h3>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import child from "./component/child";
import Loader from "../../components/commons/Loader";
export default {
  name: "productPage",
  components: {
    Loader,
    child,
  },
  data() {
    return {
      setBottom: false,
      info: {
        limit: 5,
        offset: 0,
        status: 2,
      },
    };
  },

  created() {
    this.getProduct(this.info);
    window.addEventListener("scroll", () => {
      this.setBottom = this.handleScroll();
    });
  },

  computed: {
    ...mapState({
      products: (state) => state.product.products,
      loading: (state) => state.product.loading,
      statusMessage: (state) => state.product.statusMessage,
      stopCallingAPI: (state) => state.product.stopCallingAPI,
    }),
  },
  watch: {
    setBottom() {
      if (!this.stopCallingAPI && !this.loading) {
        this.info.offset += 5;
        this.getProduct(this.info);
      }
    },
  },
  methods: {
    ...mapActions(["getProduct"]),
    handleScroll() {
      const { scrollY } = window;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomReached = visible + scrollY >= pageHeight;
      return bottomReached || pageHeight < visible;
    },
  },
};
</script>
<style scoped>
.loader {
  width: 100%; 
   min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}
.statusMessage {
  width: 100%;
}

.statusMessage h3 {
 min-height: 100vh; 
  align-items: center;
  display: flex;
  justify-content: center;
  color: rgb(235, 25, 25);
  font-weight: 500;
  font-size: 0.9rem;
}
</style>
