<template>
  <h1 v-if="tag">Videos with tag "{{ tag.name }}"</h1>
  <pre>{{ getVideosOnTag(this.$route.params.id) }}</pre>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'

export default {
  computed: {
    tag() {
      return this.getTag(this.$route.params.id)
    },
    ...mapState(useVideosStore, ['getTag', 'getVideosOnTag'])
  }
}
</script>
