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
  flex-wrap: wrap;
  justify-content: end;
  gap: 0.75em;
  padding: 0;
}

.TagsList-link {
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  padding: 0.125em 1em;
  background: rgb(23, 69, 69) linear-gradient(to top, hsla(0, 0%, 100%, 0.125) 50%, transparent 50%);
  border-radius: 10px;
  border: 2px solid rgb(0, 92, 92);
  text-decoration: none;
}
.TagsList-link:hover {
  background-color: rgb(0, 92, 92);
  border-color: black;
}
</style>
