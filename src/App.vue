<template>
  <v-app id="app">
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </v-app>
</template>

<script>
export default {
  name: "App",
   methods: {
  //   conso: function() {
  //     console.log("data ", this.store);
  //   }
   }
}
</script>

<style scoped>
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
</style>
