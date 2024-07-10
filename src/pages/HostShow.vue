<script>
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import AppMessage from '../components/AppMessage.vue';


export default {
    name: 'HostShow',
    components: {
        AppMessage,
    },

    data() {
        return {
            host: null,
            map: null,
            apiKey: '3AC1MRPiIv2a942lYsYeHx621M3GAx0y',
            visitorIp: ''
        };
    },
    methods: {
        getHost() {
            axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    this.host = response.data.results;
                    console.log(this.host.services.data);
                    if (this.host.latitude && this.host.longitude) {
                        console.log("Latitude:", this.host.latitude, "Longitude:", this.host.longitude);

                        this.$nextTick(() => {
                            this.initMap(this.host.latitude, this.host.longitude);
                        });
                    } else {
                        console.error('Latitude and/or longitude not provided in host data.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching the host:', error);
                });
        },

        initMap(latitude, longitude) {
            if (!this.map) {
                console.log('Initializing map with latitude:', latitude, 'and longitude:', longitude);
                let position = [longitude, latitude];
                if (this.$refs.mapContainer) {
                    if (tt && typeof tt.map === 'function') {
                        let map = tt.map({
                            key: this.apiKey,
                            container: this.$refs.mapContainer,
                            center: position,
                            zoom: 15
                        });

                        if (map) {
                            console.log('Map initialized successfully.');
                            console.log(this.map);
                            const marker = new tt.Marker().setLngLat(position).addTo(map);
                            this.map = map
                        } else {
                            console.error('Failed to initialize the map.');
                        }
                    } else {
                        console.error('TomTom SDK is not properly loaded or tt.map is not a function.');
                    }
                } else {
                    console.error('Map container not found.');
                }
            }
            
        },

        /* verifica path immagini per capire se sono state inserite da db (url) o caricate dall'utente */ 
        isURL(str) {
            return str.startsWith('http://') || str.startsWith('https://')
        }
    },
    
    mounted() {
        this.getHost();

            // Ottieni l'indirizzo IP del visitatore
        axios.get('https://api.ipify.org?format=json')
        .then(response => {
            this.visitorIp = response.data.ip;

            // Invia l'indirizzo IP al server
            axios.post('/api/save-visitor-ip', {
            address_ip: this.visitorIp,
            date_visit: new Date().toISOString()
            })
            .then(response => {
            console.log('Indirizzo IP salvato con successo:', response.data);
            })
            .catch(error => {
            console.error('Errore durante il salvataggio dell\'indirizzo IP:', error);
            });
        })
        .catch(error => {
            console.error('Errore durante l\'ottenimento dell\'indirizzo IP:', error);
        });
    }
};
</script>

<template>
    <main class="overflow-hidden">
        <div class="container  mt-5">
            <div v-if="host">
                <div v-if="host.title">
                    <h2 class="fw-bold">{{ host.title }}</h2>
                    <a @click.prevent="$router.go(-1)" class="breadcrumb text-secondary">Home / Torna indietro</a>
                </div>
                <div v-if="host.thumb" class="ms-container d-none d-lg-block mt-4">
                    <div class="row h-100 m-0 my-row" >
                        <div class="col-6 overflow-hidden h-100 p-0 thumb-img">
                            <img v-if="isURL(host.thumb)" :src="host.thumb" alt="Immagine non disponibile" class="w-100 h-100">
                            <img v-else :src="'http://127.0.0.1:8000/api/' + host.thumb" alt="Immagine alternativa" class="w-100 h-100">
                        </div>
                        <div class="col-6 h-100 ps-2" >
                            <div class="row h-100 ms-0 ps-0 ">
                                <div v-for="image in host.images" class="image-container h-50 col-6 p-0">
                                    <img v-if="isURL(image.image)" :src="image.image" alt="Immagine non disponibile" class="w-100 h-100 secondary-img">
                                    <img v-else :src="'http://127.0.0.1:8000/api/' + image.image" alt="Immagine alternativa" class="w-100 h-100 secondary-img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CAROSELLO MOBILE - TABLET -->
                 <div class="d-lg-none mobile-carousel ">
                    <div id="carouselExample" class=" carousel slide carousel h-100">
                        <div class="carousel-inner h-100 ">
                            <div v-if="host.thumb" class="carousel-item active h-100">
                                <img v-if="isURL(host.thumb)" :src="host.thumb" alt="Immagine non disponibile" class="d-inline-block">
                                <img v-else :src="'http://127.0.0.1:8000/api/' + host.thumb" alt="Immagine alternativa" class="d-inline-block">
                            </div>
                            <div v-for="image in host.images" class="carousel-item h-100">
                                <img v-if="isURL(image.image)" :src="image.image" alt="Immagine non disponibile" class="d-inline-block ">
                                <img v-else :src="'http://127.0.0.1:8000/api/' + image.image" alt="Immagine alternativa" class="d-inline-block ">
                            </div>
                            
                        </div>
                        <button class="carousel-control-prev carousel-btn " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next carousel-btn " type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                        <!-- /CAROSELLO MOBILE - TABLET -->
                        </div>
                 </div>
                <div class="row ms-0">
                    <div class="col-lg-7 col-12">
                        <div v-if="host.address" class="mt-4">
                            <h4 class="fw-bold">Stanza a {{ host.address }}</h4>
                        </div>
                        <p class="dashboard-p text-secondary">
                            {{ host.number_of_room < 2 ? host.number_of_room + ' camera da letto' : host.number_of_room + ' camere da letto' }} &#183;
                            {{ host.number_of_bed < 2 ? host.number_of_bed + ' letto' : host.number_of_bed + ' letti' }} &#183;
                            {{ host.number_of_bath < 2 ? host.number_of_bath + ' bagno' : host.number_of_bath + ' bagni' }} &#183;
                            {{ host.square_meters }} m<sup>2</sup>
                        </p>
                        <div class="dashboard-p" v-if="host.description">
                            <h5 class="mb-3 fw-bold">Cosa ti aspetta</h5>
                            <p>{{ host.description }}</p>
                        </div>
                        <div class="my-3 dashboard-p">
                            <h5 class="mb-3 fw-bold">Servizi disponibili</h5>
                            <ul id="ul-services">
                                <li class="li-services mt-2" v-for="service in host.services" :key="service.id">
                                    <i :class="service.icon"></i> {{ service.name }}
                                </li>
                            </ul>
                            <p v-if="host.services.length < 1">
                                Nessun servizio disponibile
                            </p>
                        </div>
                        <div class="my-3">
                            <h5 class="mb-3 fw-bold">Dove si trova</h5>
                            <div id="map" ref="mapContainer" style="width: 100%; height: 400px;"></div>
                        </div>
                    </div>
                    <div class="col-lg-5  col-12 d-flex flex-column align-items-center">
                        <div class="my-card mt-5 p-4 mb-5">
                            <div v-if="host.price">
                                <AppMessage :apartmentId="host.id"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p hidden>Indirizzo IP del visitatore: {{ visitorIp }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.ms-container{
    height:60vh
}
.my-row{
    border-radius: 16px;
    overflow: hidden;
}

.thumb-img{
    padding-right: 20px;
    img{

        object-fit: cover;
    }
}

// .secondary-img{
//     max-height: 150px
// }

.image-container{
    overflow: hidden;
}

.image-container:nth-of-type(1){
    padding-right: 5px !important;
    padding-bottom: 5px !important;
}

.image-container:nth-of-type(2){
    padding-left: 5px !important;
    padding-bottom: 5px !important;
    border-top-right-radius: 16px;
}

.image-container:nth-of-type(3){
    padding-right: 5px !important;
    padding-top: 5px !important;
}

.image-container:nth-of-type(4){
    padding-left: 5px !important;
    padding-top: 5px !important;

    border-bottom-right-radius: 16px;
}

.image-container{
    height: 50%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.primary-color{
    color: $primary-color;
}

.primary-btn{
    background-color: $primary-color;
    border: 1px solid $primary-color !important;
    color: #fff;
    font-weight: 600;
    padding: 20px 26px;
    width: 100%;
}

.primary-btn:hover{
    background-color: $primary-color;
    color: #fff;
    box-shadow: 0 0 10px $primary-color;
    border: 1px solid $primary-color !important;
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
    display: inline-block;
}

.breadcrumb:hover{
    color: #212121 !important;
}

#map {
    width: 100%;
}

#ul-services{
    list-style-type: none;
    padding: 0;
}
//  CAROSELLO MOBILE
.mobile-carousel{
    height: 50vh;
    
}
.carousel-inner{
    border-radius: 16px;

}
.carousel-item{
    img{
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
}
    .carousel-btn{
    background-color: $primary-color;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 25px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 1;
    
}

.carousel-btn:nth-of-type(1){
    position: absolute;
    top: 50%;
    left: 15px;
    
    transform: translateY(-50%);

}
.carousel-btn:nth-of-type(2){
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    
}
</style>

