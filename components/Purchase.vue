<template>
  <div>
    <div v-if="!free">
      <h2>Step 1: Purchase an offer</h2>
      <p>Select one of the following offers bellow and execute the associated command line to purchase the service.</p>
      <Offers :service="service"/>
    </div>
    <div>
      <h2 v-if="!free">Step 2: Deploy the service</h2>
      <p>Deploy the service on your MESG node</p>
      <CommandLine :value="deployCommand"/>
    </div>
  </div>
</template>

<script>
import Offers from '~/components/Service/Sections/Offers.vue'
import CommandLine from '~/components/CommandLine'
export default {
  components: {
    Offers,
    CommandLine
  },
  props: {
    service: {
      type: Object,
      required: true
    },
    versionHash: {
      type: String,
      required: true
    }
  },
  computed: {
    deployCommand() {
      return `mesg-core service deploy mesg://marketplace/service/${
        this.versionHash
      }`
    },
    free() {
      return (
        this.service.offers.length === 0 ||
        !!this.service.offers.find(x => parseFloat(x.price) === 0)
      )
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 1em;
  margin-bottom: .5em;
}
p {
  margin-bottom: 1em;
}
</style>
