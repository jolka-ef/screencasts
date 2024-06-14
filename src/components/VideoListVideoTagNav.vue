<template>
  <nav>
    <ul class="TagsList">
      <li v-for="tag_id in tag_ids">
        <RouterLink class="TagsList-link" :to="{ name: 'tag', params: { id: tag_id } }">{{
          getTag(tag_id).name
        }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>
<script>
import { useVideosStore } from '@/stores/videos'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useVideosStore, ['getTag'])
  },
  props: { tag_ids: Array }
}
</script>
<style>
.TagsList {
  list-style: none;
  display: flex;
  justify-content: end;
  gap: 0.75em;

  padding: 0;
}
.TagsList-link {
  cursor: pointer;
  display: inline-block;
  font-size: 1.25em;
  padding: 0.375em 0.5em;
  background-color: #d6f3e7;
  border-radius: 10px;
}
</style>
