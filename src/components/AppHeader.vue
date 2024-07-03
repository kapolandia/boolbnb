<script>
import axios from 'axios';

export default {
  name: 'AppHeader',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      selectedLocation: {
        lat: null,
        lon: null
      }
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
      this.searchQuery = result.address.freeformAddress;
      this.selectedLocation.lat = result.position.lat;
      this.selectedLocation.lon = result.position.lon;

      console.log('Nome ricerca', this.searchQuery, 'Latitudine:', this.selectedLocation.lat, 'Longitudine:', this.selectedLocation.lon);

      this.searchResults = []; // Nascondi i suggerimenti dopo la selezione
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
                            <input v-model="searchQuery" class="search-input mt-2" placeholder="Cerca un luogo..." @input="handleInputChange">
                            <ul v-if="searchResults.length > 0">
                                <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
                                {{ result.address.freeformAddress }}
                                </li>
                            </ul>
                        </div>
                        <button type="submit" class="btn search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
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
        z-index: 1;
        background-color: #fff;
    }

    .search-input{
        border: none;
        width: 250px;
    }

    .search-input:focus{
        box-shadow: none;
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