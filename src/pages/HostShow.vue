
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
    <div class="container">
        <div v-if="host">
            <div v-if="host.title">
                <h1>{{ host.title }}</h1>
            </div>
            <div v-if="host.thumb">
                <!-- http://127.0.0.1:8000/storage/${host.thumb}     percorso alla cartella della api -->
                <img :src="`${host.thumb}`" alt="non funziona il link">
            </div>
            <div v-if="host.price">
                <div><strong>{{ host.price }}</strong>€/notte</div>
            </div>
            <div class="d-flex gap-2">

                <div v-if="host.square_meters">
                    <div>MetriQ: <strong>{{ host.square_meters }}</strong></div>
                </div>
                <div v-if="host.number_of_room">
                    <div>Stanze: <strong>{{ host.number_of_room }}</strong></div>
                </div>
                <div v-if="host.number_of_bath">
                    <div>Bagni: <strong>{{ host.number_of_bath }}</strong></div>
                </div>
                <div v-if="host.number_of_bed">
                    <div>Letti: <strong>{{ host.number_of_bed }}</strong></div>
                </div>
            </div>
            <div v-if="host.address">
                <div>indirizzo: <strong>{{ host.address }}</strong></div>
            </div>
            <div v-if="host.description">
                <div>Descrizione:
                    <div>
                        {{ host.description }}
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>
