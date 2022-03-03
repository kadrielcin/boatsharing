<script>
export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {
      defaultBio: 'This user has no bios yet.',
    }
  },
}
</script>

<template lang="pug">
div(v-if="user").box
    
  .box
    h1 {{ user.name }} ({{ user.age }})
    p Bio: {{ user.bio || defaultBio }}
    h2 Photo ({{ user.boatPhotos.length }})
    h1 {{ user.name }} has {{ user.boats.length }} boat(s)
    .boat(v-for="boat in user.boats")
      router-link(:to="`/boats/${boat._id}`") Boatname: {{ boat.name }}
       
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: rgb(235, 201, 205);
  border-radius: 0.3rem;
}
.boat {
  font-size: 30px;
}
</style>
