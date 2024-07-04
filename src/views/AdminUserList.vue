<template>
  <div v-for="user in users" :key="user.id">
    {{ user.name }} <v-btn @click="loginUser(user)">Sign in</v-btn>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
export default {
  computed: {
    ...mapState(useVideosStore, ['users', 'loginUser'])
  },
  mounted() {
    useVideosStore().loadUsers()
  }
}
</script>
