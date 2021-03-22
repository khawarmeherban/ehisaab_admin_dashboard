<template>
  <div>
    <v-card class="flex" height="100%" style="box-shadow:none;">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
      >
        <v-list-item>
          <v-list-item-avatar size="40px">
            <v-img src="../assets/k.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>Admin</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-lists dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
            @click.stop="CheckForSignOut(item.title)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-lists>
      </v-navigation-drawer>
      <slot />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Layout",
  methods: {
    CheckForSignOut(title) {
      if (title == "Sign Out") {
        this.SignOut();
        window.location.reload();
      }
    },
    SignOut() {
      return window.localStorage.clear();
    },
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashoard", icon: "mdi-home-city", to: "/" },
        { title: "Product", icon: "mdi-account", to: "/product" },
        {
          title: "Notification",
          icon: " mdi-bell-circle",
          to: "/notify",
        },
        { title: "Sign Out", icon: "mdi-exit-to-app" },
      ],
      mini: true,
    };
    // },
  },
};
</script>
<style scoped>
.flex {
  display: flex !important;
  height: 100vh;
}
</style>
