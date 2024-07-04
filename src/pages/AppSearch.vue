<script>
import { store } from '../store';
import ShareProp from '../components/ShareProp.vue';
export default{
        name: 'AppSearch',
        components:{
            ShareProp
        },
        data(){
            return{
                store,
                UrlBase :window.location.origin,
            
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
        ResetPopup(){
            this.Popup = {};
            document.body.style.overflow = '';
        },
        isURL(str) {
            return str.startsWith('http://') || str.startsWith('https://')
        }
        
        }
    }
</script>
<template>
    <section class="d-flex">

        <aside>
            <div class="aside p-2">
                
                <h4>Servizi:</h4>
                <div class="services">
                    <div  class="d-flex my-2 "
                    v-for="service in store.services">
                    <input type="checkbox" class="me-2" :name="service.name" id="">
                    <label :for="service.name">{{ service.name }}</label>
                    </div>
                </div>
                <div>
                    <select class="me-2" name="bath" id="" >
                        <option
                        v-for="n in 5"
                        :value="n">{{ n }}</option>
                    </select>
                    <label for="bath">Bagni</label>
                </div>
                <div>

                    <select class="me-2" name="room" id="" >
                        <option
                        v-for="n in 5"
                        :value="n">{{ n }}</option>
                    </select>
                    <label for="room">stanze</label>
                </div>
            </div>
        </aside>
        <div class="container">
            <div class="row">
                <div
                v-for="apartment in store.apartments"
                class="col-3 my-2">
                <router-link class="text-decoration-none text-black position-relative" :to="{name: 'host-show', params: {'slug' : apartment.slug}}">
                    <div class="ms-card text-start">
                        <div class="img-container position-relative my-2">
                            <div @click.prevent="GetPopup(apartment)" class="share-button p-2 rounded-circle position-absolute"><i class="fa-solid fa-arrow-up-from-bracket"></i></div>
                            <img v-if="isURL(apartment.thumb)" :src="apartment.thumb" alt="Immagine non disponibile" class="w-100 h-100">
                            <img v-else :src="'http://127.0.0.1:8000/api/' + apartment.thumb" alt="Immagine alternativa" class="w-100 h-100">
                        </div>
                        <h6 class="mt-3 fw-bold">{{ apartment.title }}</h6>
                        <p class="text-secondary mb-0">Host: azienda specializzata</p>
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
        </div>
    </section>
</template>

<style lang='scss' scoped>
aside{
    border-right:1px solid #e9e9e9;
}
aside, .aside{
    width: 250px;
    height: calc(100vh - 67.45px - 64.73px);
}
.aside{
    overflow-y: auto;
    .services{
        height: 150px;
        overflow-y: auto;
    }

}
footer{
    margin-top:0;
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