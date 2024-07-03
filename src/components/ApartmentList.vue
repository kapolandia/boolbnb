<script>
import axios from 'axios';
import ShareProp from './ShareProp.vue';

export default {
    name: 'ApartmentList',
    components: {
        ShareProp
    },
    data() {
        return {
            apiUrl: 'http://127.0.0.1:8000/api',
            hosts:[],
            //caricamento api
            hostIsLoading: true,
            UrlBase :window.location.origin,
            
            Popup: {
            },
            
        }
    },

    methods:{
        GetHostFromApi() {
            console.log();
            axios.get(this.apiUrl + '/apartments')
            
            .then((response) => {
                this.hosts = response.data.results;
                console.log('minchia quante api');
                this.hostIsLoading= false;
                
            });
        },
        GetPopup(host, event){
            console.log(this.UrlBase);
            
            this.Popup = host;
            document.body.style.overflow = 'hidden';
            console.log(this.Popup);
            
        },
        ResetPopup(){
            this.Popup = {};
            document.body.style.overflow = '';
        },
        /* verifica path immagini per capire se sono state inserite da db (url) o caricate dall'utente */ 
        isURL(str) {
            return str.startsWith('http://') || str.startsWith('https://')
        }
    },
    mounted(){
        this.GetHostFromApi();
    }
}
</script>

<template>
    <!-- display solo se il caricamento è finito -->
     <section class="position-relative">

         <div 
         v-if="!hostIsLoading"
         class="container text-center mt-4">
         <div class="my-border-bottom mb-5">
             <h2 class="fw-bold" id="section1">Per tutti i gusti <i class="fa-solid fa-house-circle-check primary-color"></i></h2>
             <p class="p-subtitle w-75 mx-auto">Che tu stia cercando un accogliente appartamento in centro, una villa spaziosa con giardino, o una tranquilla casa di campagna, siamo certi che abbiamo la soluzione giusta per te.</p>
            </div>
            <div class="row">
                <div
                v-for="host in hosts"
                class="col-3 my-2">
                <router-link class="text-decoration-none text-black position-relative" :to="{name: 'host-show', params: {'slug' : host.slug}}">
                    <div class="ms-card text-start">
                        <div class="img-container position-relative my-2">
                            <div @click.prevent="GetPopup(host)" class="share-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
                            <img v-if="isURL(host.thumb)" :src="host.thumb" alt="Immagine non disponibile" class="w-100 h-100">
                            <img v-else :src="'http://127.0.0.1:8000/api/' + host.thumb" alt="Immagine alternativa" class="w-100 h-100">
                        </div>
                        <h6 class="mt-3 fw-bold">{{ host.title }}</h6>
                        <p class="text-secondary mb-0">Host: azienda specializzata</p>
                        <p ><strong>{{ Math.floor(host.price) }} €</strong> a notte</p>
                    </div>
                </router-link>
                
            </div>
            <ShareProp 
            v-if="this.Popup.title != null" 
            :shareProp="Popup"
            :UrlBase="UrlBase"
            @closePopup="ResetPopup()"
            >
            
            </ShareProp>
        </div>
    </div>
</section>
</template>

<style lang="scss">
router-link{
z-index: 0;
}
.ms-card{
    display: flex;
    flex-direction: column;
    height: 100%;
    .share-button{
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        top:10px;
        right: 10px;
        background-color: rgba($color: lightgrey, $alpha: 0.7);
        z-index: 1;
    }
    .img-container{
        width: 100%;
        height: 60%;
        max-height: 150px;
        overflow: hidden;
        border-radius: 15px;
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
}

    .primary-color{
        color: $primary-color;
    }

    .p-subtitle{
        font-size: 18px;
    }

    .my-border-bottom{
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 10px;
    }

</style>