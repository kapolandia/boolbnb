<script>
import axios from 'axios'
export default {
    name: 'ApartmentList',
    data() {
        return {
            apiUrl: 'http://127.0.0.1:8000/api',
            hosts:[],
        }
    },

    methods:{
        GetHostFromApi() {
            console.log('chiamo le api');
            axios.get(this.apiUrl + '/apartments')
            
            .then((response) => {
                this.hosts = response.data.results;
                console.log('minchia quante api');
            
        })
        }
    },
    mounted(){
        this.GetHostFromApi()
    }
}
</script>
<template>
ciao sono la lista
</template>
<style lang="scss">
</style>