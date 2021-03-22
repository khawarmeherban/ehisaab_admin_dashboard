<template>
  <!-- <v-row> -->
    <v-card
      hover
      style="margin:10px; background-color: transparent"
      max-width="250px"
    
    >
      <v-img
        class="media"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title class="headline-6 grey--text text--darken-3 text- text-capitalize">
        {{ product.product_name }}
      </v-card-title>
      <v-card-subtitle class="grey--text text--darken-2 text- text-capitalize">
        {{ product.product_sale_price }}
      </v-card-subtitle>

      <v-card-actions class="justify-space-between">
        <v-btn
          color="success"
          outlined
          rounded
          :loading="
            updateLoading && productID == product.id && acceptProduct == 1
          "
          text
          @click="acceptRequest(product.id)"
        >
          Accepted
        </v-btn>

        <v-btn
          color="error"
          :loading="
            updateLoading && productID == product.id && acceptProduct == 3
          "
          outlined
          rounded
          text
          @click="rejectRequest(product.id)"
        >
          Rejected
        </v-btn>

        <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          :color="snackBarColor"
          text="white"
          top
          center
        >
          {{ UpdationMessage.msg }}
        </v-snackbar>
      </v-card-actions>
    </v-card>
  <!-- </v-row> -->
</template>

<script>
import { mapActions, mapState } from "vuex";
import { IMAGE_URL } from "../../../store/api";
export default {
  name: "child",
  props: ["product", "id"],
  data() {
    return {
      snackbar: false,
      snackBarColor: "",
      toRemoveId: null
    };
  },

  methods: {
    ...mapActions(["updateProduct"]),
    getImageURL: function() {
      const image_name = this.product.image_url;
      if (image_name == "") {
        // return
        return "../../assets/profile.jpg";
      } else {
        return `${IMAGE_URL}${image_name}`;
      }
    },
    acceptRequest(id) {
      let data = {
        status: 1,
        id: id,
      };
      this.snackbar = false;
      this.toRemoveId = id;
      this.updateProduct(data);
      // const el = this.products.map((item) => item.id).indexOf(id);
      // this.products.splice(el, 1);
    },
    rejectRequest(id) {
      let data = {
        status: 3,
        id: id,
      };
      this.snackbar = false;
      console.log(id, "id from function call")
      this.toRemoveId = id;

      this.updateProduct(data);
     
    },
  },
  computed: {
    ...mapState({
      products: (state) => state.product.products,
      updateLoading: (state) => state.updateProducts.updateLoading,
      productID: (state) => state.updateProducts.productID,
      statusMessage: (state) => state.updateProducts.statusMessage,
      acceptProduct: (state) => state.updateProducts.acceptProduct,
      rejectProduct: (state) => state.updateProducts.rejectProduct,
      UpdationMessage: (state) => state.updateProducts.UpdationMessage,
    }),
    returnUpdateMessageType() {
      return this.UpdationMessage.type;
    }
  },
  watch: {
    returnUpdateMessageType(val){
      console.log("change detected", val)
      if(val == 1) {
        this.snackbar = true;
        this.snackBarColor = "success";
        if(this.toRemoveId){
          const el = this.products.map((item) => item.id).indexOf(this.toRemoveId);
          this.products.splice(el, 1);
        }
      } else if(val == 2) {
        this.snackbar = true;
        this.snackBarColor = "error";
      }
    }
  }
};
</script>
