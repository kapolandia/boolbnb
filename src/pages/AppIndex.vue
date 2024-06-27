<script>
  import HomeJumbotron from '../components/HomeJumbotron.vue';
  import HomeHosts from '../components/HomeHosts.vue';

  export default{
    name: 'AppIndex',
    components: {
      'HomeJumbotron': HomeJumbotron,
      'HomeHosts' : HomeHosts,
    },
  }
</script>

<template>
  <div class="container mt-5">
    <HomeJumbotron></HomeJumbotron>
    <HomeHosts></HomeHosts>
  </div>
</template>

<style scoped>

</style>
