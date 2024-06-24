<script>
    export default{
        name: 'AppHeader',
    }
</script>

<template>
    <header>
        <nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="../assets/images/logo.png" alt="Boolbnb" width="150">
            </a>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
    </header>
</template>

<style lang="scss" scoped>
    header{
        border-bottom: 2px solid #F7F7F7;
    }
</style>