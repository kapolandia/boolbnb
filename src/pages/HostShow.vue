
<script>
import axios from 'axios';
    export default {
        name: 'HostShow',
        
        data(){

            return{
                host: null
            }
        },
        methods: {
            getHost(){
                axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                this.host= response.data.results;
                
            });
            }
        },
        mounted(){
            this.getHost()
        }
    }
</script>

<template>
    <main class="overflow-hidden">
        <div class="container header-margin">
            <div v-if="host">
                <div v-if="host.title">
                    <h2 class="fw-bold">{{ host.title }}</h2>
                    <router-link :to="{name: 'index'}" class="breadcrumb text-secondary">Home / Torna indietro</router-link>
                </div>
                <div v-if="host.thumb" class="mt-4">
                    <!-- http://127.0.0.1:8000/storage/${host.thumb}     percorso alla cartella della api -->
                    <div class="row m-0">
                        <div class="col-6 overflow-hidden first-div-img p-0">
                            <img src="https://a0.muscache.com/im/pictures/c74e5b95-8877-4c9a-8a9a-423c4db4cdd7.jpg?im_w=1200" alt="non funziona il link" class="w-100 h-100">
                        </div>
                        
                        <div 
                        v-for="image in host.images"
                        class="image-container">
                            <img class=" pe-0" :src="'http://127.0.0.1:8000/api/'+ image.image" alt="">
                        </div>
                        <!-- <div class="col-3 pe-0">
                            <img src="https://a0.muscache.com/im/pictures/984e9d3f-34d8-4047-984e-d8a6f0cdcf3c.jpg?im_w=720" alt="non funziona il link" class="w-100">
                            <img src="https://a0.muscache.com/im/pictures/airflow/Hosting-12372886/original/3b9d1711-7750-4e3e-b798-fc4e554371dc.jpg?im_w=720" alt="non funziona il link" class="w-100" style="margin-top: 16px;">
                        </div>
                        <div class="col-3 pe-0 last-div-img overflow-hidden">
                            <img src="https://a0.muscache.com/im/pictures/df199b26-98fd-4e8e-bfd6-4f3346416c53.jpg?im_w=720" alt="non funziona il link" class="w-100">
                            <img src="https://a0.muscache.com/im/pictures/3d61e475-7aae-42af-9423-ce901f23b1e4.jpg?im_w=720" alt="non funziona il link" class="w-100" style="margin-top: 16px;">
                        </div> -->
                    </div>
                </div>


                <div class="row ms-0">
                    <div class="col-7">
                        <div v-if="host.address" class="mt-5">
                    <h4 class="fw-bold">Stanza a {{ host.address }}</h4>
                </div>
                <p class="dashboard-p text-secondary">
                    {{ host.number_of_room < 2 ? host.number_of_room + ' camera da letto' : host.number_of_room + ' camere da letto' }} &#183;
                    {{ host.number_of_bed < 2 ? host.number_of_bed + ' letto' : host.number_of_bed + ' letti' }} &#183;
                    {{ host.number_of_bath < 2 ? host.number_of_bath + ' bagno' : host.number_of_bath + ' bagni' }} &#183;
                    {{ host.square_meters }} m<sup>2</sup>
                </p>

                <div v-if="host.description">
                    <div>Descrizione:
                        <div>
                            {{ host.description }}
                        </div>
                        
                    </div>
                </div>
                    </div>

                    <div class="col-5 d-flex flex-column align-items-center">
                        <div class="my-card mt-5 p-4">
                            <div v-if="host.price">
                                <!-- <p><span class="h4 fw-bold">{{ Math.floor(host.price) }} €</span>&nbsp; a notte</p> -->
                                <a class="btn primary-btn mt-3">Invia un messaggio</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
.image-container:nth-of-type(1){
    
    overflow: hidden;
}
.image-container{
    
    width: 50%;
    :first-of-type{
        
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    img{
        width: 100%;
    }
}

.primary-color{
    color: $primary-color;
}

.primary-btn{
    background-color: $primary-color;
    color: #fff;
    font-weight: 600;
    padding: 20px 26px;
    width: 100%;
}

.primary-btn:hover{
    background-color: $primary-color;
    color: #fff;
    box-shadow: 0 0 10px $primary-color;
    cursor: pointer;
}

.first-div-img{
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
}

.last-div-img{
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
}

.dashboard-p{
    padding-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
}

.my-card{
    border: 1px solid #e9e9e9;
    width: 70%;
    box-shadow: 0 0 10px #e9e9e9;
    border-radius: 20px;
}

.breadcrumb{
    text-decoration: underline;
    cursor: pointer;
}

.breadcrumb:hover{
    color: #212121 !important;
}
</style>
