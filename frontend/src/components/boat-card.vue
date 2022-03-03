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
    div
      .photo-box
        img(alt="boat_user" width=300 src="../assets/picture1.png")

      p Name: {{ boat.name }}     
      p Age: {{ boat.age }}
      p Longness(feet): {{ boat.longness }}
      p Cabins: {{ boat.cabins }}
      p Location: {{ boat.location }}  
       

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
  background: #dd0;
  border-radius: 0.1rem;
}
</style>
