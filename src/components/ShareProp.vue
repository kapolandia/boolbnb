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

<div class="container rounded-5  align-items-center justify-content-center ">
    <div class="row justify-content-center">
        <div>
            <i @click="$emit('closePopup')" class="fa-solid fa-close position-absolute"></i>
        </div>
        <div class="col-12 d-flex justify-content-left ms-5 mt-5">
            <h5>
                {{ shareProp.title.toUpperCase() }}
            </h5>
        </div>
        <div class="img-container my-5"> 
            <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/55a2777a-fc80-4d7b-af05-a9f737ff8661.jpeg?im_w=1440&im_q=highq" alt="">
        </div>
        <div class="col-10 price d-flex align-content-start">Prezzo {{ shareProp.price }}€ /notte</div>
        <div class="col-10 bg-white d-flex align-items-center justify-content-between  p-2">
            {{$route.fullPath + 'hosts/' + shareProp.slug }} 
            <button class="btn btn-primary">
                <i class="fa-solid fa-copy"></i>
            </button>
            
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.container{
    background-color: #dadadaf4;
    height: 60vh;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50% );
    z-index: 2;
    i{
        font-size: 20px;
        top:30px;
        right: 30px;
    }
    .img-container{
        width: 100%;
        height: 60%;
        overflow: hidden;
        border-radius: 15px;
        img{
            height: 50%;
            width: 50%;
            object-fit: cover;
        }
    }
    
    
}

</style>