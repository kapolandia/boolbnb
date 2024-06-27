<script>
    export default{
        name: 'HomeJumbotron',
    }
</script>

<template>
    <div class="row">
        <div class="col-6 position-relative">
            <h1 class="h1 fw-bolder display-4">Il soggiorno <span class="primary-color">perfetto</span> ovunque tu vada.</h1>
            <h5 class="subtitle fw-bolder mt-5">Scopri le nostre case da sogno</h5>
            <a class="btn primary-btn mt-3">Trova la tua </a>
            <img src="../assets/images/scribble.png" alt="" srcset="" class="position-absolute scribble-1">
            <img src="../assets/images/scribble.png" alt="" srcset="" class="position-absolute scribble-2">
        </div>
        <div class="col-6 position-relative">
            <div class="overflow-hidden rounded">
                <img src="https://a0.muscache.com/im/pictures/84e3c5a5-ae64-4909-8791-7ea562302b4a.jpg?im_w=1200" alt="" srcset="" class="w-100">
            </div>
            <img src="../assets/images/sun.png" alt="" srcset="" class="position-absolute sun">
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .primary-color{
        color: $primary-color;
    }
    .primary-btn{
        background-color: $primary-color;
        color: #fff;
        font-weight: 600;
        padding: 20px 26px;
        width: 60%;
        font-size: 20px;
    }

    .primary-btn:hover{
        background-color: $primary-color;
        color: #fff;
        box-shadow: 0 0 10px $primary-color;
        cursor: pointer;
    }

    .subtitle{
        font-size: 26px;
    }

    .rounded{
        border-radius: 30px !important;
    }

    .scribble-1{
        left: -100px;
        top: 100px;
        width: 70px;
    }


    .scribble-2{
        right: 80px;
        bottom: -40px;
        width: 70px;
        transform: scaleX(-1);
        rotate: -40deg;
    }

    .sun{
        right: -30px;
        top: -40px;
        width: 100px;
    }
</style>