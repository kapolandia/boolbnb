<script>
    export default{
        name: 'AppFooter'
    }
</script>

<template>
    <footer class="d-flex justify-content-center mt-5">
        <div class="container row ">
            <div class="col-4">©2024 &nbsp;<span class="fw-bold">Boolbnb</span>, Inc.</div>
            <div class="col-4 text-center">
                <div class="language"><i class="fa-solid fa-earth-europe"></i> Italiano (IT)</div>
            </div>
            <div class="col-4 text-end">
                <div class="support">Supporto <i class="fa-solid fa-headset"></i></div>
            </div>
        </div>
    </footer>
</template>


<style lang="scss" scoped>
    footer{
        border-top: 1px solid #e9e9e9;
        padding: 20px;
    }

    p:hover{
        cursor: pointer;
        text-decoration: underline;
    }

    .language, .support {
        display: inline-block;
    }

    .language:hover, .support:hover {
        cursor: pointer;
        text-decoration: underline;
    }
</style>