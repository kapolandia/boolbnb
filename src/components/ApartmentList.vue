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
    class="container">
    <h2>Le migliori case!</h2>
        <div class="row">
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
</style>