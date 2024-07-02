<script>
    export default{
        name: 'AppHeader',
        data(){
            return{
                search: ''
            }
        }
    }
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
                    <input class="form-control search-input"v-model="search" type="search" placeholder="Dove vuoi soggiornare?" aria-label="Search">
                    <router-link :to=" this.search.length >0 ? {name: 'host-search', params: {'search' : search}} :'' " class="btn search-btn"><i class="fa-solid fa-magnifying-glass"></i></router-link>
                </div>
            </form>
        </div>
    </nav>
    </header>
</template>

<style lang="scss" scoped>
    header{
        border-bottom: 1px solid #e9e9e9;
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
</style>