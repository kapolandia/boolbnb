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
        <div>
            <label for="name">Nome:</label>
            <input type="text" v-model="form.name" id="name" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" v-model="form.email" id="email" required :readonly="isAuthenticated">
        </div>
        <div>
            <label for="object">Oggetto:</label>
            <input type="text" v-model="form.object" id="object">
        </div>
        <div>
            <label for="description">Messaggio:</label>
            <textarea v-model="form.description" id="description" required></textarea>
        </div>
            <button type="submit">Invia</button>
        </form>
    </div>
</template>

<style lang="scss">
    
</style>