<script>
import axios from 'axios'
export default {
    name: 'ApartmentList',
    data() {
        return {
            apiUrl: 'http://127.0.0.1:8000/api',
            hosts:[],
            //caricamento api
            hostIsLoading: true,
        }
    },

    methods:{
        GetHostFromApi() {
            console.log('chiamo le api');
            axios.get(this.apiUrl + '/apartments')
            
            .then((response) => {
                this.hosts = response.data.results;
                console.log('minchia quante api');
                this.hostIsLoading= false;
                console.log(this.hosts);
            
        })
        }
    },
    mounted(){
        this.GetHostFromApi()
    }
}
</script>

<template>
    <!-- display solo se il caricamento è finito -->
    <div 
    v-if="!hostIsLoading"
    class="container text-center mt-4">
    <div class="my-border-bottom mb-5">
        <h2 class="fw-bold">Per tutti i gusti <i class="fa-solid fa-house-circle-check primary-color"></i></h2>
        <p class="p-subtitle w-75 mx-auto">Che tu stia cercando un accogliente appartamento in centro, una villa spaziosa con giardino, o una tranquilla casa di campagna, siamo certi che abbiamo la soluzione giusta per te.</p>
    </div>
        <div class="row">
            <div class="col-3 my-2">
                <div class="ms-card">
                    <div class="img-container">
                        <img src="../assets/images/image.png" alt="">
                    </div>
                <h5>Ciao</h5>
                <div>100€ a notte</div>
                </div>
            </div>
            <div
            v-for="host in hosts"
            class="col-3 my-2">
            <router-link class="text-decoration-none text-black" :to="{name: 'host-show', params: {'slug' : host.slug}}">
                <div class="ms-card">
                        <div class="img-container position-relative my-2">
                            <div class="share-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
                            <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/55a2777a-fc80-4d7b-af05-a9f737ff8661.jpeg?im_w=1440&im_q=highq" alt="">
                        </div>
                    <h5>{{ host.title }}</h5>
                    <div>{{ host.price }}€/notte</div>
                
                </div>
            </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.ms-card{
    display: flex;
    flex-direction: column;
    .share-button{
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        top:10px;
        right: 10px;
        background-color: rgba($color: lightgrey, $alpha: 0.7);
    }
    .img-container{
        width: 100%;
        height: 60%;
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