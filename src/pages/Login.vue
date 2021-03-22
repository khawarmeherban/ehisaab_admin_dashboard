<template>
  <div class="LoginForm">
    <v-card
      width="500px"
      flex
      class="max-auto justify-center align-center"
    >
    <v-expand-transition>
      <v-card-title
        flex
        color="#0277BD"
        height="300px"
        class=" justify-center pb=0"
      >
        <h3 class=" text-center font-weight-medium mb-2 blue--text">Login</h3>
      </v-card-title>
    </v-expand-transition>
      <v-card-text>
        <v-form
          width="300px"
          v-model="isValid"
          v-on:submit.prevent="loginForm"
        >
          <v-text-field
            label="Email"
            :rules="emailRules"
            required
            rounded
            outlined
            prepend-inner-icon="mdi-email"
            v-model="userEmail"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            required
            rounded
            outlined
            label="Password"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outlined
              rounded
              width="100%"
              class="my-4 py-4"
              normal
              color="#0277BD"
              :loading="authLoading"
              :disabled="!isValid"
              type="submit"
              >Login
              <span v-if="authLoading" class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </v-btn>
            <v-snackbar
              v-if="authStatus.msg > 0"
              v-model="snackbar"
              :timeout="3000"
              color="snackBarColor"
              top
              center
            >
              {{ authStatus.msg }}            
            </v-snackbar>
            
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex"
export default {
  name: "Login",
  data: () => ({
    isValid: false,
    showPassword: false,
    userEmail: "",
    password: "",
    snackbar: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    passwordRules: [(v) => !!v || "Password is required"],
  }),
  computed: {
      ...mapState({
          authStatus: state =>state.auth.authStatus,
          authLoading: state => state.auth.authLoading
      }),
    //   getColor() {
    //   if (this.authStatus.type == 1) {
    //     return "success";
    //   } else if (this.authStatus.type == 2) {
    //     return "error";
    //   }
    //   return this.checkStatusMessage;
    // },
    returnUpdateMessageType(){
       return this.authStatus.type;
    }
  },
watch:{
   returnUpdateMessageType(val){
      console.log("change detected", val)
      if(val == 1) {
        this.snackbar = true;
        this.snackBarColor = "success";
  
      } else if(val == 2) {
        this.snackbar = true;
        this.snackBarColor = "error";
      }
   }
   },
  methods: {
    ...mapActions(["userLogin"]),
    loginForm() {
      let token = {
        email: this.userEmail,
        password: this.password,
      };
     this.userLogin(token)
    },
  },
};
</script>
<style scoped>
.LoginForm {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
 
}
</style>
