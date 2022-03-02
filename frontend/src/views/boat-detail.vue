<script>
import BoatCard from '@/components/boat-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'BoatDetail',
  components: { BoatCard },
  data() {
    return {
      boat: [],
    }
  },
  async created() {
    this.boat = await this.fetchBoat(this.$route.params.id)
  },
  methods: {
    ...mapActions(['fetchBoat']),
  },
}
</script>

<template lang="pug">
  .about
    h1 Boat detail
    BoatCard(:boat="boat")
        
</template>
