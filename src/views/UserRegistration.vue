<template>
  <h1>Register</h1>

  <v-container>
    <UserAuthForm :submitForm="register" buttonText="Register" :hasName="true" />
  </v-container>
</template>
<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
import { useSnackbarsStore } from '@/stores/snackbars'
import { useVideosStore } from '@/stores/videos'
import { mapActions, mapState } from 'pinia'
export default {
  computed: {
    ...mapState(useVideosStore, ['registerUser'])
  },
  components: {
    UserAuthForm
  },
  methods: {
    ...mapActions(useSnackbarsStore, ['setSnackbar']),
    async register(registrationInfo) {
      const user = await this.registerUser(registrationInfo)

      if (user.error) {
        this.setSnackbar({
          color: 'error',
          text: user.error
        })
      } else {
        this.setSnackbar({
          text: `Welcome in our app ${user.name}`
        })
      }
    }
  }
}
</script>
