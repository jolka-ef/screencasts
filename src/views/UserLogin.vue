<template>
  <v-container>
    <v-form>
      <v-text-field
        v-model="loginInfo.email"
        label="email"
        :rules="[required('email'), emailFormat()]"
      />
      <v-text-field
        v-model="loginInfo.password"
        label="password"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'password' : 'text'"
        @click:append-inner="showPassword = !showPassword"
        counter
        :rules="[required('password'), minLength('password', 8)]"
      />

      <v-btn @click="login">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from 'pinia'
import { useVideosStore } from '@/stores/videos'
import validation from '@/utils/validation'
export default {
  data() {
    return {
      loginInfo: {
        email: '',
        password: ''
      },
      showPassword: true,
      ...validation
    }
  },
  computed: {
    ...mapState(useVideosStore, ['loginUser'])
  },
  methods: {
    async login() {
      const user = await this.loginUser(this.loginInfo)
      if (user.error) {
        alert(user.error)
      } else {
        alert('You logged in ' + 'user.name ')
      }
    }
  }
}
</script>
