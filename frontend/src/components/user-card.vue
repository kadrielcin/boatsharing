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
div(v-if="user").box
  .photo-box
    img(alt="boatsharing_user" width=300 src="../assets/smilingboat-pp.jpg")


.box
  h1 {{ user.name }} ({{ user.age }})
  p Bio: {{ user.bio || defaultBio }}
  h2 Photo ({{ user.boatPhotos.length }})

  .boatPhoto(v-for="boatPhoto in user.boatPhotos")
  img(:src="`https://picsum.boatPhotos${boatPhoto.filename}`" :alt="boat.description" :title="boat.description")
    
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
