<script>
export default  {
    name: 'ShareProp',
    props: {
        shareProp: Object,
        UrlBase: String
  },
  data(){
    return{
        linkApartment:   this.UrlBase + '/host/'  + this.shareProp.slug  
            
    }
  } ,
  methods:{
    copyText(){
        navigator.clipboard.writeText(this.linkApartment);
    }
  }
}
</script>

<template>

<div class="container rounded-5 p-5 pb-2 align-items-center justify-content-center ">
    <div class="row justify-content-center flex-column">
        <div>
            <i @click="$emit('closePopup')" class="fa-solid fa-close position-absolute"></i>
        </div>
        <div class="col-12 d-flex justify-content-left ">
            <h5>
                {{ shareProp.title.toUpperCase() }}
            </h5>
        </div>
        <div class="img-container my-4"> 
            <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/55a2777a-fc80-4d7b-af05-a9f737ff8661.jpeg?im_w=1440&im_q=highq" alt="">
        </div>
        <div class="col-10 mt-3 w-100">

            <div class="price d-flex align-content-start my-2">Prezzo {{ shareProp.price }}€ /notte</div>
            <div class="link-wrapper d-flex align-items-center justify-content-between  p-2">
            {{linkApartment}}
                <button class="copy" @click="copyText()">
                    <i class="fa-solid fa-copy"></i>
                </button>
                
        </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.container{
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: white;
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
        min-height: 60%;
        overflow: hidden;
        border-radius: 15px;
        img{
            
            width: 50%;
            object-fit: cover;
        }
    }
    
    .copy{
        background-color: $primary-color;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border: none;
        &:hover{
            box-shadow: 0 0 10px $primary-color;
        
    
        }
    }
    .link-wrapper{
        border:1px solid #e9e9e9;
        padding: 5px 16px;
        border-radius: 30px;
        
        width: 100%;
    }
}

</style>