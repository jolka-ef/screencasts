<template>
  <v-form>
    <v-text-field
      v-model="userInfo.email"
      label="email"
      :rules="[required('email'), emailFormat()]"
    />

    <v-text-field
      v-model="userInfo.password"
      label="password"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'password' : 'text'"
      @click:append-inner="showPassword = !showPassword"
      counter
      :rules="[required('password'), minLength('password', 8)]"
    />
    <v-btn @click="submitForm(userInfo)">{{ buttonText }}</v-btn>
  </v-form>
</template>
<script>
import validation from '@/utils/validation'
export default {
  data() {
    return {
      userInfo: {
        email: '',
        password: ''
      },
      showPassword: true,
      ...validation
    }
  },
  props: { submitForm: Function, buttonText: String }
}
</script>
