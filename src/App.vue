<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

</script>

<template>
  <AppHeader></AppHeader>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
  .header-margin{
    margin-top: 100px;
  }

  @media screen and (max-width:767px) {
    .header-margin{
      margin-top: 50px;
    }
  }

  html{
    scroll-behavior: smooth;
  }
</style>
