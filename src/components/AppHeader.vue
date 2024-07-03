<script>
import axios from 'axios';
import { tt } from '@tomtom-international/web-sdk-maps';

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
            key: '3AC1MRPiIv2a942lYsYeHx621M3GAx0y'
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

      console.log('Nome ricerca', this.searchQuery, 'Latitudine:', this.selectedLocation.lat, 'Longitudine:', this.selectedLocation.lon);

      this.searchResults = []; // Nascondi i suggerimenti dopo la selezione
    },
    searchApi(){
        this.selectResult();
        console.log(this.selectedLocation.lat);
        console.log(this.selectedLocation.lon);
        axios.get('http://127.0.0.1:8000/api/search', {
            params: {
                longitude: this.selectedLocation.lon,
                latitude: this.selectedLocation.lat,
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
            }
  }
};
</script>

<template>
    <header>
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../assets/images/logo.png" alt="Boolbnb" width="150">
                </a>
                <form role="search" class="search-wrapper d-none d-sm-block">
                    <div class="d-flex">
                        <div>
                            <input v-model="searchQuery" class="search-input mt-2" placeholder="Cerca un luogo..." @input="handleInputChange" @keydown.enter.prevent="searchApi">
                            <ul v-if="searchResults.length > 0">
                                <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
                                {{ result.address.freeformAddress }}
                                </li>
                            </ul>
                        </div>
                        <button type="submit" class="btn search-btn" @click="searchApi()"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
                <div id="login" class="btn">
                  <a href="http://127.0.0.1:8000/login"> 
                    <span class="me-2">Login</span>
                    <i class="fa-solid fa-user-tie fs-4"></i>
                  </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
    header{
        border-bottom: 1px solid #e9e9e9;
        position: fixed;
        width: 100%;
        z-index: 2;
        background-color: #fff;
    }

    .search-input{
        border: none !important;
        width: 250px;
    }

    .search-input:focus{
        box-shadow: none;
        outline: none;
        border: none !important;
    }

    .search-btn{
        background-color: $primary-color;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }

    .search-btn:hover{
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

    .search-wrapper{
        border:1px solid #e9e9e9;
        padding: 5px 16px;
        border-radius: 30px;
    }

    #login{
      background-color: $primary-color;
      padding: 10px;

      span{
        color: white;
      }

      a{
        text-decoration: none;
        /* color: #FF5A5E; */
        color: white;
      }
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 8px;
        cursor: pointer;
    }

    li:hover {
        background-color: #f0f0f0;
    }
</style>
