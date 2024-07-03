<script>
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';

export default {
    name: 'HostShow',

    data() {
        return {
            host: null,
            map: null,
            apiKey: '3AC1MRPiIv2a942lYsYeHx621M3GAx0y'
        };
    },
    methods: {
        getHost() {
            axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.slug}`)
                .then((response) => {
                    this.host = response.data.results;
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
    },

    mounted() {
        this.getHost();
    }
};
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
                    <div class="row m-0">
                        <div class="col-6 overflow-hidden first-div-img p-0">
                            <img :src="host.thumb" alt="non funziona il link" class="w-100 h-100">
                        </div>
                        <div v-for="image in host.images" class="image-container">
                            <img class=" pe-0" :src="'http://127.0.0.1:8000/api/'+ image.image" alt="">
                        </div>
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
                        <div class="mt-3">
                            <!-- Use a ref to access this element -->
                            <div id="map" ref="mapContainer" style="width: 100%; height: 400px;"></div>
                        </div>
                    </div>
                    <div class="col-5 d-flex flex-column align-items-center">
                        <div class="my-card mt-5 p-4">
                            <div v-if="host.price">
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

svg{
    fill: $primary-color;
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

#map {
    width: 100%;
}
</style>
