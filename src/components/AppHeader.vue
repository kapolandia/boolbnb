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
                    <input class="form-control search-input" type="search" placeholder="Dove vuoi soggiornare?" aria-label="Search">
                    <a class="btn search-btn"><i class="fa-solid fa-magnifying-glass"></i></a>
                </div>
            </form>
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