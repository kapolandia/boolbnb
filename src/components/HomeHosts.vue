<script>
    export default{
        name: 'HomeHosts',
    }
</script>

<template>
    <div class="container text-center justify-content-center mt-5 pt-4">
        <h2 class="fw-bold">Con i migliori host <i class="fa-solid fa-heart primary-color"></i></h2>
        <div class="slider mt-4" style="
            --width: 100px;
            --height: 100px;
            --quantity: 10;
        ">
            <div class="list">
                <div class="item" style="--position: 1">
                    <img src="../assets/images/profile_1.webp" alt="">
                </div>
                <div class="item" style="--position: 2">
                    <img src="../assets/images/profile_2.webp" alt=""></div>
                <div class="item" style="--position: 3">
                    <img src="../assets/images/profile_3.webp" alt=""></div>
                <div class="item" style="--position: 4">
                    <img src="../assets/images/profile_4.webp" alt=""></div>
                <div class="item" style="--position: 5">
                    <img src="../assets/images/profile_5.webp" alt=""></div>
                <div class="item" style="--position: 6">
                    <img src="../assets/images/profile_6.webp" alt=""></div>
                <div class="item" style="--position: 7">
                    <img src="../assets/images/profile_7.webp" alt=""></div>
                <div class="item" style="--position: 8">
                    <img src="../assets/images/profile_8.webp" alt=""></div>
                <div class="item" style="--position: 9">
                    <img src="../assets/images/profile_9.webp" alt=""></div>
                <div class="item" style="--position: 10"><img src="../assets/images/profile_10.webp" alt=""></div>
            </div>
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
        left: -70px;
        top: 100px;
        width: 70px;
    }


    // Slider
    .slider{
        width: 100%;
        height:200px;
        padding-top: 30px;
        padding-bottom: 100px;
        margin-bottom: 100px;
        overflow: hidden;
        mask-image: linear-gradient(
            to right,
            transparent,
            #000 10% 90%,
            transparent
        );
    }
    .slider .list{
        display: flex;
        width: 100%;
        min-width: calc(var(--width) * var(--quantity));
        position: relative;
    }
    .slider .list .item{
        width: var(--width);
        height: var(--height);
        position: absolute;
        left: 100%;
        animation: autoRun 10s linear infinite;
        transition: filter 0.5s;
        border-radius: 12px;
        overflow: hidden;
        animation-delay: calc( (10s / var(--quantity)) * (var(--position) - 1) )!important;
    }
    .slider .list .item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    @keyframes autoRun{
        from{
            left: 100%;
        }to{
            left: calc(var(--width) * -1);
        }
    }
    .slider:hover .item{
        animation-play-state: paused!important;
        filter: grayscale(1);
    }
    .slider .item:hover{
        filter: grayscale(0);
        transform: scale(1.5); /* Scale up the item on hover */
        background-color: #fff;
        z-index: 10; /* Ensure the hovered item is above other items */
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    }

    .slider[reverse="true"] .item{
        animation: reversePlay 10s linear infinite;
    }
</style>