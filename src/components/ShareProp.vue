<script>
export default  {
    name: 'ShareProp',
    props: {
        shareProp: Object,
  },
  data(){
    return{
        
    }
  } 
}
</script>

<template>

<div class="container popup d-flex align-items-center justify-content-center">
    <i @click="$emit('closePopup')" class="fa-solid fa-close"></i>
    {{ shareProp.title }}
    {{$route.fullPath + 'hosts/' + shareProp.slug }} 
</div>
</template>

<style lang="scss" scoped>
.container{
    background-color: rgba($color: lightgrey, $alpha: 0.7);
    height: 60vh;
    width: 70vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , 50% );
    opacity: 0;
    &.popup{
        opacity: 1;
    }
}

</style>