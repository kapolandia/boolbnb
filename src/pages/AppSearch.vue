<script>
import { store } from '../store';
import ShareProp from '../components/ShareProp.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default{
        name: 'AppSearch',
        components:{
            ShareProp
        },
        data(){
            return{
                store,
                isSearching: false,
                UrlBase :window.location.origin,
                distance: 20,
                bed: 1,
                room: 1,
                services:[],
                Popup: {},
            }
        },
        methods:{
            GetPopup(host, event){
                console.log(this.UrlBase);
                
                this.Popup = host;
                document.body.style.overflow = 'hidden';
                console.log(this.Popup);
            },

            searchApi(){
                this.isSearching= true;
                let trueDistance = this.distance * 1000;
                    store.apartments = [];
                    axios.get('http://127.0.0.1:8000/api/search', {
                        params: {
                            longitude: store.longitude,
                            latitude: store.latitude,
                            distance: trueDistance,
                        }
                    })
                    .then(response => {
                        this.isSearching=false;
                        if(response.result = "true"){
                            response.data.apartments.forEach(apartment => {
                                store.apartments.push(apartment);
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },

            consolelog(){
                console.log(store.apartments); 
            },

            logServices(){
                console.log(this.services);
            },

            clearFilters(){
                this.services = [];
                this.bed = 1;
                this.room = 1;
                this.distance = 20;
            },

            ResetPopup(){
                this.Popup = {};
                document.body.style.overflow = '';
            },

            isURL(str) {
                return str.startsWith('http://') || str.startsWith('https://')
            },

            matchesSelectedServices(apartment) {
                const selectedServiceIds = this.services;
                const apartmentServiceIds = apartment.services.map(service => service.id);

                return selectedServiceIds.every(serviceId => apartmentServiceIds.includes(serviceId));
            },
        },
        mounted(){
            console.log(store.apartments.length);
            this.clearFilters();
        }
    }
</script>
<template>
    <div class="container mt-3">
        <div class="d-flex justify-content-between">
            <h5 class="h5 fw-bold mb-0">Risultati per case a {{ store.searchInput }}</h5>
            <button v-if="this.$route.name == 'host-search'" class="btn btn-outline-dark px-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Filtri <i class="fa-solid fa-sliders ms-2"></i>
            </button>
        </div>
        <router-link :to="{name: 'index'}" class="breadcrumb text-secondary">Home / Torna indietro</router-link>
    </div>
    <section class="d-flex">

        <!-- Per ora lo commento
        <aside>
            <div class="aside p-2">
                <form action=""  method="get" @submit.prevent="submitForm">

                    <h4>Servizi:</h4>
                    <div class="services">
                        <div  class="d-flex my-2 "
                    v-for="service in store.services">
                    <input  type="checkbox" class="me-2" :name="service.name" v-model="services" :id="service.name">
                    <label :for="service.name">{{ service.name }}</label>
                </div>
                </div>
                <div>
                    <select class="me-2" name="bath" v-model="bed" id="" >
                    
                        <option
                        v-for="n in 5"
                        :value="n">{{ n }}</option>
                    </select>
                    <label for="bath">Letti</label>
                </div>
                <div>

                    <select class="me-2"  name="room" id="" v-model="room"  >
                        <option
                        v-for="n in 5"
                        :value="n">{{ n }}</option>
                    </select>
                    <label for="room">stanze</label>
                </div>
                <div class="distance">
                    <input type="range" name="distance" min="5" @click="consolelog()"  max="50" id="" v-model="distance">
                    {{ distance }}
                </div>
                <button type="submit">Cerca</button>
            </form>
            </div>
        </aside>
        -->

        <!-- se sta caricando -->
        <div v-if="isSearching">
            <div class="container">

                <img src="../assets/images/mini-logo.png" class="loading" alt="">
            </div>

        </div>
        <div v-else class="container">
            <div class="row">
                <div
                v-for="apartment in store.apartments"
                v-show="room <= apartment.number_of_room && bed <= apartment.number_of_bed && matchesSelectedServices(apartment)"
                class="col-sm-6 col-md-4 col-lg-3 my-2">
                    <router-link  class="text-decoration-none text-black position-relative" :to="{name: 'host-show', params: {'slug' : apartment.slug}}">
                        <div class="ms-card text-start">
                            <div class="img-container position-relative my-2">
                                <div @click.prevent="GetPopup(apartment)" class="share-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
                                <img v-if="isURL(apartment.thumb)" :src="apartment.thumb" alt="Immagine non disponibile" class="w-100 h-100">
                                <img v-else :src="'http://127.0.0.1:8000/api/' + apartment.thumb" alt="Immagine alternativa" class="w-100 h-100">
                            </div>
                            <h6 class="mt-2 mb-1 fw-bold">{{ apartment.title }}</h6>
                            <p class="text-secondary mb-2">Host: azienda specializzata</p>
                            <p ><strong>{{ Math.floor(apartment.price) }} €</strong> a notte</p>
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

            <div v-if="store.apartments.length < 1 && isSearching === false" class="d-flex align-items-center justify-content-center text-center flex-column mt-5 position-relative" style="margin-bottom: 330px;">
                <img src="../assets/images/house-login.png" alt="" srcset="" class="w-50">
                <img src="../assets/images/cloud.png" alt="" srcset="" style="position: absolute;right: 100px;top: 0;max-width: 100px;" class="d-lg-none">
                <img src="../assets/images/scribble.png" alt="" srcset="" style="position: absolute;right: 100px;top: 0;max-width: 100px;scale: -1;transform: rotate(25deg);" class="d-none d-lg-block">
                <h4 class="h4 fw-bold mt-4">Nessuna casa trovata</h4>
                <p class="p">Prova ad inserire una nuova meta</p>
            </div>
        </div>

        <!-- Modale filtri -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="exampleModalLabel">Applica filtri</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="aside p-2">
                        <form action=""  method="get" @submit.prevent="submitForm">

                            <div class="row mb-4">
                                <div class="col-6">
                                    <h5 class="h5 fw-bold mb-2">Letti minimi</h5>
                                    <select class="mb-2 form-select" name="bath" v-model="bed" id="" >
                                        <option v-for="n in 5" :value="n">{{ n }}</option>
                                    </select>
                                </div>

                                <div class="col-6">
                                    <h5 class="h5 fw-bold mb-2">Stanze minime</h5>
                                    <select class="mb-2 form-select"  name="room" id="" v-model="room"  >
                                        <option v-for="n in 5" :value="n">{{ n }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="distance mb-4">
                                <h5 class="h5 fw-bold mb-2">Raggio ricerca</h5>
                                <input type="range" name="distance" min="5" max="50" value="20" v-model="distance" class="w-100 form-range">
                                <p>Case nel raggio di {{ distance }} km</p>
                            </div>

                            <h5 class="h5 fw-bold">Servizi necessari</h5>
                            <div class="services">
                                <div  class="my-2" v-for="service in store.services" :key="service.id">
                                    <input  type="checkbox" class="me-3 form-check-input" :name="service.name" :id="service.id" v-model="services" :value="service.id" @click="logServices()">
                                    <label :for="service.name"><i :class="service.icon"></i> <span class="ms-1">{{ service.name }}</span></label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="clearFilters()">Cancella filtri</button>
                    <button type="submit" class="btn btn-dark" data-bs-dismiss="modal" @click="searchApi()">Applica filtri</button>
                </div>
                </div>
            </div>
        </div>
                    
    </section>
</template>

<style lang='scss' scoped>

.loading {
  animation: spin 1.5s infinite linear;
  width: 100px;
  position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50% );
    z-index: 2;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
label i{
    width: 30px;
}

.btn-outline-dark{
    border: 1px solid #e9e9e9;
  }

  .breadcrumb{
    text-decoration: underline;
    cursor: pointer;
}

.breadcrumb:hover{
    color: #212121 !important;
}

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