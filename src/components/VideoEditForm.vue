<template>
  <v-form v-model="valid">
    <v-text-field
      label="Name"
      v-model="video.name"
      variant="solo-filled"
      counter="50"
      :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
    />
    <v-textarea
      label="Description"
      v-model="video.description"
      variant="solo-filled"
      counter="true"
      :rules="[required('description'), minLength('description', 20)]"
    />
    <v-text-field
      label="Video Url"
      v-model="video['video-url']"
      variant="solo-filled"
      :rules="[required('video URL')]"
      hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo."
    />
    <v-text-field
      label="Thumbnail URL"
      v-model="video.thumbnail"
      variant="solo-filled"
      :rules="[required('thumbnal URL')]"
    />

    <v-btn @click="saveVideo" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>
<script>
import validation from '@/utils/validation.js'
export default {
  data() {
    return {
      valid: false,
      ...validation
    }
  },
  props: {
    buttonText: String,
    saveVideo: Function,
    video: Object
  }
}
</script>
