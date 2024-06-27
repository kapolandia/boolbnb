<script>
  import HomeJumbotron from '../components/HomeJumbotron.vue';
  import HomeHosts from '../components/HomeHosts.vue';
  import ApartmentList from '../components/ApartmentList.vue';

  export default{
    name: 'AppIndex',
    components: {
      HomeJumbotron,
      HomeHosts,
      ApartmentList,
    },
  }
</script>

<template>
  <div class="container mt-5">
    <HomeJumbotron></HomeJumbotron>
    <HomeHosts></HomeHosts>
  </div>
  <div class="container">
    <ApartmentList></ApartmentList>
  </div>
</template>

<style scoped>

</style>
