<script>
    import { gsap } from "gsap-trial";
    import { Draggable } from "gsap-trial/Draggable";
    import { InertiaPlugin } from "gsap-trial/InertiaPlugin";

    export default{
        name: 'HomeJumbotron',
        data(){
            return{
            }
        },
        methods: {
            scroll(){
                document.getElementById('section1').scrollIntoView();
            },
            DoAnimation(){
                let tl = gsap.timeline()
                
                gsap.registerPlugin(Draggable,InertiaPlugin);

                gsap.set("#cloud", {transformOrigin:"50% 50%"})
                gsap.set("#sun", {transformOrigin:"50% 50%"})

                tl.to("#cloud",{x: 200, duration: 3}, 'onStart')
                tl.to("#cloud",{x: 0, duration: 3}, 'onReturn')
                tl.to("#sun",{rotate: 360,duration: 3}, 'onStart')
                tl.to("#sun",{rotate: -360,duration: 3}, 'onReturn')
                tl.repeat(3)
                
                Draggable.create("#cloud", {
                    bounds:{
                        minX: 0,
                        maxX: 200,
                        
                    },
                    type:"x",
                    overshootTolerance:0,
                    inertia: true,
                }),
                Draggable.create("#sun", {
                    type:"rotation",
                    inertia:true
                })
                
            }           
        },
        mounted(){
            this.DoAnimation()
        }
    }
</script>

<template>
    <div class="row" >
        <div class="col-sm-12 col-md-6 position-relative">
            <h1 class="h1 fw-bolder display-4">Il soggiorno <span class="primary-color">perfetto</span> ovunque tu vada.</h1>
            <h5 class="subtitle fw-bolder mt-5">Scopri le nostre case da sogno</h5>
            <a class="btn primary-btn mt-3" @click="scroll()" tabindex="0">Trova la tua </a>
            <img src="../assets/images/scribble.png" alt="" srcset="" class="position-absolute scribble-1  d-sm-block d-lg-none" >
            <img src="../assets/images/scribble.png" alt="" srcset="" class="position-absolute scribble-2">
        </div>
        <div class="col-sm-12 col-md-6 position-relative" id="animation-space">
            <div class="overflow-hidden rounded" >
                <img  src="../assets/images/image.png" alt="" srcset="" class="w-100">
            </div>
            <img  src="../assets/images/sun.png" alt="" srcset="" id="sun" class="position-absolute sun">
            

                <img id="cloud" src="../assets/images/cloud.png" alt="" srcset="" class="position-absolute cloud">
            
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
        border: 1px solid $primary-color !important;
    }

    .primary-btn:hover{
        background-color: $primary-color;
        color: #fff;
        box-shadow: 0 0 10px $primary-color;
        cursor: pointer;
    }

    .primary-btn:focus {
        transform: scale(0.96) !important;
        transition: transform 0.1s ease-in-out;
    }

    .primary-btn:focus:not(:active) {
        transform: scale(1) !important; 
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

    .cloud{
        left: -20px;
        top: -70px;
        width: 100px;
    }

    .position-relative:last-of-type{
        margin-top: 60px;
    }

    @media screen and (max-width: 767px) {
        .scribble-1{
            top: 50px;
            left: -70px;
        }

        .sun{
            right: -20px;
            top: -70px;
            width: 100px;
        }
    }

    @media screen and (min-width: 992px) {
        .position-relative:last-of-type{
            margin-top: 0px;
        }
    }

    @media screen and (max-width: 1199px) {
        .scribble-2{
            display: none;
        }
    }

    @media screen and (min-width: 1399px) {
        .scribble-2{
            right: 80px;
            bottom: -10px;
            width: 70px;
            transform: scaleX(-1);
            rotate: -40deg;
        }
    }
   
</style>