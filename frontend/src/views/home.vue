<script>
import UserCard from '@/components/user-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  components: {},
  data() {
    return {}
  },
}
</script>

<template lang="pug">  
    .card
      .headline
        .name 
          h1.title Boatsharing        
        .slogan          
          p Welcome on board!                 
      .summary
        p Find your favorit boat!        
</template>

<style lang="scss">
.body {
  background-color: brown;
}
p,
h1 {
  font-size: 30px;
  color: black;
  margin: 0px;
}
.card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .headline {
    display: flex;
    flex-direction: column;
    align-items: center;
    .name > h1 {
      font-size: 50px;
    }
  }
  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 30px;
    }
  }
}
</style>
