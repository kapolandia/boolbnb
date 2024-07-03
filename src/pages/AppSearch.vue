<script>


import ShareProp from '../components/ShareProp.vue';
import axios from 'axios';
export default{
        name: 'AppSearch',
        components:{
            ShareProp,  
        },
        data(){
            return{
                SearchParams:{
                    distance: 5,
                    longitude:'',
                    latitude:'',
                },
                apiUrl : 'http://127.0.0.1:8000/api',
                hostIsLoading: true,
                Popup: {},
            }
            
        },
        methods:{
            getSearchedContent(){
                this.hostIsLoading= true;
                axios.get(this.apiUrl + '/search',{params: this.SearchParams})
                .then((response) => {
                console.log(response);
                this.hosts = response.data.apartments;
                console.log('minchia quante api');
                this.hostIsLoading= false;
                
            });
            },
            GetPopup(host, event){
            console.log(this.UrlBase);
            
            this.Popup = host;
            console.log(this.Popup);
            
        },
        ResetPopup(){
            this.Popup = {}
        }
        }
    }
</script>
<template>
    <div class="app-wrapper d-flex">

        <aside>
            <div class="aside">
                
                <div>
                        <label for="latitude">Latitudine</label>
                        
                        <input type="number"  step="00.000001" name="latitude" id="" v-model="SearchParams.latitude">
                    </div>
                    <div>
                        <label for="longitude">longitudine</label>
                        <input type="number" step="00.000001" name="longitude" id="" v-model="SearchParams.longitude">
                    </div> 
                    <div class="range d-flex ">
                    <label for="customRange2" class="form-label mx-1"><i class="fa-solid fa-street-view"></i></label>
                    <input type="range" class="form-range" min="5" max="50" id="customRange2" name="distance" v-model="SearchParams.distance">
                    <span>{{ SearchParams.range }}KM</span>   
                    <button @click="getSearchedContent()">Cerca</button>
                </div>
            </div>
        </aside>
        <div class="container">
            <section class="position-relative">

<div 
v-if="!hostIsLoading"
class="container text-center mt-4">
<div class="my-border-bottom mb-5">
    <h2 class="fw-bold">Per tutti i gusti <i class="fa-solid fa-house-circle-check primary-color"></i></h2>
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
                   <img :src="'http://127.0.0.1:8000/api/'+ host.thumb" alt="">
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
        </div>
    </div>
</template>
<style lang="scss" scoped>
.range{
    width: 100%;
}
aside{
    position: sticky;
    top: 0;
    left: 0;
}

.aside, aside{
    height: calc(100vh - 67.45px - 164.63px);
    width: 200px;
}
.container{
    width: calc(100% - 200px);
    overflow-y: auto;
}
</style>