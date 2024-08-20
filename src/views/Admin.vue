<template>
  <v-container>
    <v-tabs align-tabs="center">
      <v-tab to="/admin/videos">Videos</v-tab>
      <v-tab to="/admin/tags">Tags</v-tab>
      <v-tab to="/admin/users">Users</v-tab>
    </v-tabs>
    <RouterView />
  </v-container>
</template>
