<script>
export default {
  name: 'BoatCard',
  props: ['boat'],
  data() {
    return {}
  },
}
</script>

<template lang="pug">
div
  .box
    h1 {{ user.name }} ({{ user.age }})
    p Bio: {{ user.bio || defaultBio }}
    h2 Photos ({{ user.boatPhotos.length }})

  .boatPhoto(v-for="boatPhoto in boat.boatPhotos")
    img(:src="`https://picsum.boatPhotos${boatPhoto.filename}`" :alt="boatPhoto.description" :title="boatPhoto.description")

  .box
    p Name: {{ boat.boatName }}
    p Age: {{ boat.age }}
    p Length: {{ boat.length }}
    p Cabins: {{ boat.cabins }}
    p Location: {{ boat.location }}
    p Cabins: {{ boat.cabins }}

    p(v-if="!boat.likedBy.length")
      | no likes yet!
    p(v-else)
      | {{ boat.likedBy.map(user => user.name).join(', ') }}  
   
</template>

<style lang="scss" scoped>
.box {
  width: 400px;
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
.photo-box {
  width: 300px;
  height: 300px;
  padding: 2rem;
  border: 1px solid #333;
  background: #00ccad;
  border-radius: 0.3rem;
}
</style>
