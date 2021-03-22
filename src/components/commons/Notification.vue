<template>
  <!-- <v-container fluid> -->
  <div class="d-flex flex-row">
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea
          solo
          name="input-7-4"
          label="Message For Client"
        ></v-textarea>
      </v-col>
      <!-- <v-col
        cols="12"
        md="6"
        > -->

      <v-btn depressed color="error">
        Send
      </v-btn>
      <!-- </v-col> -->
    </v-row>
  </div>
  <!-- </v-container> -->
</template>
<script>
export default {
  name: "Notifcation",
};
</script>
<style scoped>
.d-flex {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: row;
}
</style>
