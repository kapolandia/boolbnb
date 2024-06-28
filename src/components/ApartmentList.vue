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
    <h2 class="fw-bold">Per tutti i gusti <i class="fa-solid fa-house-circle-check primary-color"></i></h2>
    <p class="p-subtitle w-75 mx-auto mb-5">Che tu stia cercando un accogliente appartamento in centro, una villa spaziosa con giardino, o una tranquilla casa di campagna, siamo certi che abbiamo la soluzione giusta per te.</p>
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
                <div class="ms-card">
                    <div class="img-container">
                        <img :src="host.thumb" alt="">
                    </div>
                <h5>{{ host.title }}</h5>
                <div>{{ host.price }}€/notte</div>
                <router-link :to="{name: 'host-show', params: {'slug' : host.slug}}" class="btn btn-primary">Vediamolo</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.ms-card{
    display: flex;
    flex-direction: column;
    .img-container{
        width: 100%;
        img{
            width: 100%;
            border-radius: 15px;
        }
    }
}

    .primary-color{
        color: $primary-color;
    }

    .p-subtitle{
        font-size: 18px;
    }
</style>