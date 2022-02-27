<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {
      defaultBio: 'This user has no bios.',
    }
  },
}
</script>

<template lang="pug">
.box
  h1 {{ user.name }} ({{ user.age }})
  p Bio: {{ user.bio || defaultBio }}
  h2 Photos ({{ user.photos.length }})

  .photo(v-for="photo in user.photos")
    img(:src="`https://picsum.photos${photo.filename}`" :alt="photo.description" :title="photo.description")
    p(v-if="!photo.likedBy.length")
      | no likes yet!
    p(v-else)
      | {{ photo.likedBy.map(user => user.name).join(', ') }}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
