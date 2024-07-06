<template>
  <h1>Login</h1>
  <v-container>
    <UserAuthForm :submitForm="login" buttonText="Login" />
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
import UserAuthForm from '@/components/UserAuthForm.vue'
export default {
  components: { UserAuthForm },
  computed: {
    ...mapState(useVideosStore, ['loginUser', 'setSnackbar'])
  },
  methods: {
    async login(loginInfo) {
      const user = await this.loginUser(loginInfo)
      if (user.error) {
        this.setSnackbar({
          color: 'error',
          text: user.error
        })
      } else {
        this.setSnackbar({
          text: `Thank ypu for signing in ${user.name} `
        })
        if (user.admin) {
          this.$router.push('/admin/videos')
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>
