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
    },
    /* verifica path immagini per capire se sono state inserite da db (url) o caricate dall'utente */ 
    isURL(str) {
        return str.startsWith('http://') || str.startsWith('https://')
    }
  }
}
</script>

<template>
<div class="my-fade" @click="$emit('closePopup')"></div>
<div class="container rounded-5 p-4 align-items-center justify-content-center ">
    <div class="d-flex justify-content-center flex-column ">
        <div>
            <i @click="$emit('closePopup')" class="fa-solid fa-close position-absolute my-x"></i>
        </div>
        <div class="text-center">
            <h6 class="fw-bold mt-2">{{ shareProp.title }}</h6>
        </div>
        <div class="img-container mt-4"> 
            <img v-if="isURL(shareProp.thumb)" :src="shareProp.thumb" alt="Immagine non disponibile" class="w-100 h-100">
            <img v-else :src="'http://127.0.0.1:8000/api/' + shareProp.thumb" alt="Immagine alternativa" class="w-100 h-100">
        </div>
        <div class="mt-2 w-100">
            <div class="link-wrapper d-flex align-items-center justify-content-between mt-3 p-2 ps-3">
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

.my-fade{
    width: 100vw;
    height: 100vh;
    background-color: rgba(66, 66, 66, 0.308);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
}

.my-x{
    cursor: pointer;
}

.container{
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: white;
    
    width: 50%;
    position: fixed;
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
        max-height: 60%;
        overflow: hidden;
        border-radius: 15px;
        img{
            
            width: 50%;
            height: 100%;
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