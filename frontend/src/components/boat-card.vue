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
      p Name: {{ boat.name }}     
      p Age: {{ boat.age }}
      p Longness: {{ boat.longness }}
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
  background: #00ccad;
  border-radius: 0.3rem;
}
</style>
