<script>
import axios from 'axios';

export default {
    name: 'AppMessage',
    props: {
        apartmentId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            form: {
                name:'',
                email: '',
                object:'',
                description:'',
                apartment_id: this.apartmentId
            },
            isAuthenticated: false,
            responseStatus: false
        };
    },
    methods: {
        resetForm() {
            this.form.name = '';
            if (!this.isAuthenticated) {
                this.form.email = '';
            }
            this.form.object = '';
            this.form.description = '';
        },
        submitForm(){
            axios.post('http://127.0.0.1:8000/api/apartments/message', this.form)
            .then(response => {
                this.responseStatus = true;
                this.resetForm();
            })
        }
    },
    mounted() {
        const token = localStorage.getItem('auth_token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.data) {
                    this.form.email = response.data.email;
                    this.isAuthenticated = true;
                }
            })
        }
    },
}
</script>

<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label class="form-label" for="name">Nome</label>
                <input class="form-control" placeholder="Inserisci il tuo nome" type="text" v-model="form.name" id="name" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input class="form-control" placeholder="Inserisci la tua email" type="email" v-model="form.email" id="email" required :readonly="isAuthenticated">
            </div>
            <div class="mb-3">
                <label class="form-label" for="object">Oggetto</label>
                <input class="form-control" placeholder="Inserisci l'oggetto" type="text" v-model="form.object" id="object">
            </div>
            <div class="mb-3">
                <label class="form-label" for="description">Messaggio</label>
                <textarea class="form-control" rows="5" placeholder="Inserisci il messaggio" v-model="form.description" id="description" required></textarea>
            </div>
            <button type="submit" class="btn primary-btn">Invia messaggio</button>
            <div v-if="responseStatus" class="mt-3">
                <p class="text-success">
                    Messaggio inviato con successo
                </p>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
    .primary-btn{
        background-color: $primary-color;
        color: #fff;
        font-weight: 600;
        padding: 16px 16px;
        width: 100%;
    }

    .primary-btn:hover{
        background-color: $primary-color;
        color: #fff;
        box-shadow: 0 0 10px $primary-color;
        cursor: pointer;
    }
</style>