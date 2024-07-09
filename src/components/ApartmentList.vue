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
            hosts: [],
            hostIsLoading: true,
            UrlBase: window.location.origin,
            Popup: {},
        };
    },
    computed: {
        // Filtra gli appartamenti con visibility = 1
        filteredApartments() {
            return this.hosts.filter(host => host.visibility === 1);
        },
        // Filtra gli appartamenti visibility = 0
        filteredAllApartments() {
            return this.hosts.filter(host => host.visibility === 0);
        }
    },
    methods: {
        GetHostFromApi() {
            axios.get(this.apiUrl + '/apartments')
                .then((response) => {
                    this.hosts = response.data.results;
                    console.log('Dati degli appartamenti ricevuti:', this.hosts);
                    this.hostIsLoading = false;
                })
                .catch(error => {
                    console.error('Errore nel recupero degli appartamenti:', error);
                });
        },
        GetPopup(host) {
            this.Popup = host;
            document.body.style.overflow = 'hidden';
        },
        ResetPopup() {
            this.Popup = {};
            document.body.style.overflow = '';
        },
        isURL(str) {
            return str.startsWith('http://') || str.startsWith('https://');
        }
    },
    mounted() {
        this.GetHostFromApi();
    }
};
</script>

<template>
    <section class="position-relative">
        <div v-if="!hostIsLoading" class="container text-center mt-4">
            <div class="my-border-bottom mb-5">
                <h2 class="fw-bold" id="section1">Per tutti i gusti <i class="fa-solid fa-house-circle-check primary-color"></i></h2>
                <p class="p-subtitle w-75 mx-auto">Che tu stia cercando un accogliente appartamento in centro, una villa spaziosa con giardino, o una tranquilla casa di campagna, siamo certi che abbiamo la soluzione giusta per te.</p>
            </div>

            <!-- Appartamenti sponsorizzati -->
            <div class="row mb-5">
                <h3 class="text-start fw-bold">Appartamenti in <span class="primary-color">evidenza</span></h3>
                <div v-for="host in filteredApartments" :key="host.id" class="col-sm-6 col-md-4 col-lg-3 my-2">
                    <router-link class="text-decoration-none text-black position-relative" :to="{ name: 'host-show', params: { 'slug': host.slug } }">
                        <div class="ms-card text-start">
                            <div class="img-container position-relative my-2">
                                <!-- <div @click.prevent="GetPopup(host)" class="share-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-arrow-up-from-bracket"></i></div> -->
                                <div class="sponsor-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-crown"></i></div>
                                <img v-if="isURL(host.thumb)" :src="host.thumb" alt="Immagine non disponibile" class="w-100 h-100">
                                <img v-else :src="'http://127.0.0.1:8000/api/' + host.thumb" alt="Immagine alternativa" class="w-100 h-100">
                            </div>
                            <h6 class="mt-1 mb-1 fw-bold">{{ host.title }}</h6>
                            <p class="text-secondary mb-2">Host: {{ host.user.name }} {{ host.user.surname }}</p>
                            <p class="dashboard-p text-secondary">
                                {{ host.number_of_room < 2 ? host.number_of_room + ' camera da letto' : host.number_of_room + ' camere da letto' }} &#183;
                                {{ host.number_of_bed < 2 ? host.number_of_bed + ' letto' : host.number_of_bed + ' letti' }}
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Tutti gli appartamenti -->
            <div class="row">
                <h3 class="text-start fw-bold">Le nostre case</h3>
                <div v-for="host in filteredAllApartments" :key="host.id" class="col-sm-6 col-md-4 col-lg-3 my-2">
                    <router-link class="text-decoration-none text-black position-relative" :to="{ name: 'host-show', params: { 'slug': host.slug } }">
                        <div class="ms-card text-start">
                            <div class="img-container position-relative my-2">
                                <!-- <div @click.prevent="GetPopup(host)" class="share-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-arrow-up-from-bracket"></i></div> -->
                                <img v-if="isURL(host.thumb)" :src="host.thumb" alt="Immagine non disponibile" class="w-100 h-100">
                                <img v-else :src="'http://127.0.0.1:8000/api/' + host.thumb" alt="Immagine alternativa" class="w-100 h-100">
                            </div>
                            <h6 class="mt-1 mb-1 fw-bold">{{ host.title }}</h6>
                            <p class="text-secondary mb-2">Host: {{ host.user.name }} {{ host.user.surname }}</p>
                            <p class="dashboard-p text-secondary">
                                {{ host.number_of_room < 2 ? host.number_of_room + ' camera da letto' : host.number_of_room + ' camere da letto' }} &#183;
                                {{ host.number_of_bed < 2 ? host.number_of_bed + ' letto' : host.number_of_bed + ' letti' }}
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Componente per il popup -->
            <ShareProp v-if="Popup.title != null" :shareProp="Popup" :UrlBase="UrlBase" @closePopup="ResetPopup()"></ShareProp>
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
    .sponsor-button{
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        top:10px;
        right: 10px;
        background-color: $primary-color;
        color: #fff;
        z-index: 1;
        cursor: default;
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