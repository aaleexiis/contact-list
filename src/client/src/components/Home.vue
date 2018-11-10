<template>
  <main class="l-home-page">
    <app-header></app-header>
    <v-layout align-end justify-end row fill-height>
      <v-btn flat color="secondary" @click="mockContacts()">Mock Contacts</v-btn>
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <input type="text" v-model="search" placeholder="Search title.."/>
      <label>Search title:</label>
    </v-layout>
    <span v-model="filteredContacts">{{filteredContacts}}</span>
    <v-snackbar
      :timeout="snackbarTimeout"
      :color="snackbarColor"
      v-model="snackbar"
      :bottom="true"
    >
      {{ snackbarText }}
      <v-spacer></v-spacer>
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </main>
</template>

<script>
  import Axios from 'axios'
  import {BaseURL, showSnackbar} from '@/utils/utils'

  export default {
    data () {
      return {
        search: '',
        contacts: [],
        snackbarText: '',
        snackbarColor: '',
        snackbarTimeout: 6000,
        snackbar: false
      }
    },
    methods: {
      mockContacts () {
        Axios.post(`${BaseURL}/api/v1/contacts/setup`)
          .then(({data}) => {
            const snackbar = showSnackbar(data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
            Axios.get(`${BaseURL}/api/v1/contacts`)
              .then(({data}) => {
                if(data.success){
                  this.contacts = data.data;
                }
              });
          });
      }
    },
    watch: {
      'contacts' : function(oldValue, newValue){
      }
    },
    computed: {
      filteredContacts() {
        return this.contacts.filter(contact => {
          return (contact.name.toLowerCase().includes(this.search.toLowerCase())
            || contact.surname.toLowerCase().includes(this.search.toLowerCase())
            || contact.email.toLowerCase().includes(this.search.toLowerCase())
            || contact.phone.some(p => p.label.toLowerCase().includes(this.search.toLowerCase()))
            || contact.phone.some(p => p.number.toLowerCase().includes(this.search.toLowerCase())))
        })
      }
    }
  }
</script>

