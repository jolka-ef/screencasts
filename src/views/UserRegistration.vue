<template>
  <h1>Register</h1>

  <v-container>
    <UserAuthForm :submitForm="register" buttonText="Register" :hasName="true" />
  </v-container>
</template>
<script>
import UserAuthForm from '@/components/UserAuthForm.vue'
import { useVideosStore } from '@/stores/videos'
export default {
  components: {
    UserAuthForm
  },
  methods: {
    async register(registrationInfo) {
      const user = await useVideosStore().registerUser(registrationInfo)
      if (user.error) {
        alert(user.error)
      } else {
        alert('Welcome in our app ' + 'user.name ')
      }
    }
  }
}
</script>
