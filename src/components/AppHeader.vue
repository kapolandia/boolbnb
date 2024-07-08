<script>
import axios from 'axios';
import{store} from '../store.js';

export default {
  name: 'AppHeader',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      selectedLocation: {
        lat: null,
        lon: null
      },
      selectedResult: null,
    };
  },
  methods: {
    async fetchSuggestions(query) {
      try {
        const response = await axios.get('https://api.tomtom.com/search/2/search/' + encodeURIComponent(query) + '.json', {
          params: {
            key: '3AC1MRPiIv2a942lYsYeHx621M3GAx0y',
            countrySet: 'IT',
          }
        });
        this.searchResults = response.data.results;
      } catch (error) {
        console.error('Errore durante la ricerca:', error);
      }
    },
    handleInputChange() {
      if (this.searchQuery.length > 2) {
        this.fetchSuggestions(this.searchQuery);
      } else {
        this.searchResults = [];
      }
    },
    selectResult(result) {
      if(result != null){
        this.selectedResult = result;
      }
      this.searchQuery = this.selectedResult.address.freeformAddress;
      this.selectedLocation.lat = this.selectedResult.position.lat;
      this.selectedLocation.lon = this.selectedResult.position.lon;
      store.longitude = this.selectedLocation.lon;
      store.latitude = this.selectedLocation.lat;
      this.searchResults = []; // Nascondi i suggerimenti dopo la selezione
    },
    searchApi(){
        //svuoto l'array nello store
        store.apartments = [];
        store.searchInput = this.searchQuery;
        this.selectResult();
        axios.get('http://127.0.0.1:8000/api/search', {
            params: {
                longitude: this.selectedLocation.lon,
                latitude: this.selectedLocation.lat,
            }
        })
        .then(response => {
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
           getServices(){
            store.services= [];
            axios.get('http://127.0.0.1:8000/api/services')
            .then(response=>{
              if(response.result = true){
              
              response.data.results.forEach(service => {
                store.services.push(service);
              });
            } 
            })
           } 
  }
};
</script>

<template>
    <header>
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../assets/images/logo.png" alt="Boolbnb" width="150" class="d-none d-md-block">
                    <img src="../assets/images/mini-logo.png" alt="Boolbnb" width="40" class="d-block d-md-none">
                </a>
                <form role="search" class="search-wrapper">
                    <div class="d-flex justify-content-between">
                        <div>
                            <input v-model="searchQuery" class="search-input mt-2" placeholder="Cerca un luogo..." @input="handleInputChange" @keydown.enter.prevent="searchApi">
                            <ul v-if="searchResults.length > 0" >
                                <li v-for="result in searchResults" :key="result.id" @click="selectResult(result), getServices()">
                                {{ result.address.freeformAddress }}
                                </li>
                            </ul>
                        </div>
                        <router-link :to="searchQuery !=''? {name: 'host-search', params: {'search' : searchQuery}} : ''" type="submit" class="btn search-btn" @click="searchApi()"><i class="fa-solid fa-magnifying-glass"></i></router-link>
                    </div>
                </form>
                <div id="login" class="btn primary-btn d-none d-md-block ms-2" v-if="this.$route.name == 'index'">
                  <a class="px-2" href="http://127.0.0.1:8000/login">Login</a>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
  header {
    border-bottom: 1px solid #e9e9e9;
    position: sticky;
    width: 100%;
    z-index: 2;
    background-color: #fff;
  }

  .primary-btn {
    background-color: $primary-color;
    color: #fff;
  }

  .primary-btn:hover {
    background-color: $primary-color;
    color: #fff;
    box-shadow: 0 0 10px $primary-color;
    cursor: pointer;
  }

  .search-input {
    border: none !important;
    width: 350px;
  }

  .search-input:focus {
    box-shadow: none;
    outline: none;
    border: none !important;
  }

  .search-btn {
    background-color: $primary-color;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .search-btn:hover {
    background-color: $primary-color;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-shadow: 0 0 10px $primary-color;
    cursor: pointer;
  }

  .search-wrapper {
    border: 1px solid #e9e9e9;
    padding: 5px 16px;
    border-radius: 30px;
    width: 450px;
    position: relative;
  }

  #login {
    background-color: $primary-color;
    padding: 10px;

    span {
      color: white;
    }

    a {
      text-decoration: none;
      color: white;
    }
  }

  ul {
    list-style-type: none;
    padding: 10px 0px;
    border-radius: 12px;
    margin: 0;
    position: absolute; 
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background-color: white; 
    border: 1px solid #e9e9e9; 
    max-height: 300px;
    overflow-y: auto;
    z-index: 10;
  }

  li {
    padding: 8px;
    cursor: pointer;
  }

  li:hover {
    background-color: #f0f0f0;
  }

  ul > li:nth-child(n+7) {
    display: none;
  }

  @media screen and (max-width:991px) {
    .search-input {
      width: 200px;
    }

    .search-wrapper {
      width: 350px;
    }
  }
</style>