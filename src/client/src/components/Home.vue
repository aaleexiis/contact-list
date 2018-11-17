<template>
  <main class="l-home-page">
    <app-header></app-header>
    <v-layout v-if="mock" align-end justify-end row fill-height>
      <v-btn flat color="secondary" @click="mockContacts()">Mock Contacts</v-btn>
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12>
        <v-text-field
          v-model="search"
          append-icon="search"
          box
          color="transparent"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <tabs
      :contacts="filteredContacts"
      @deleteContact="openDeleteContactDialog"
      @favouriteContact="favouriteContact"
    ></tabs>
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

    <v-dialog v-model="deleteContactDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this user?</v-card-title>
        <v-card-text>This cannot be undone... contact will be gone forever.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat @click.native="deleteContactDialog = false">No</v-btn>
          <v-btn color="accent" dark @click.native="deleteContact()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
  import Axios from 'axios'
  import {BaseURL, showSnackbar} from '@/utils/utils'

  import Tabs from '@/components/Tabs'

  export default {
    name: 'Home',
    components: {
      tabs: Tabs
    },
    data () {
      return {
        search: '',
        contacts: [],
        snackbarText: '',
        snackbarColor: '',
        snackbarTimeout: 6000,
        snackbar: false,
        deleteContactDialog: false,
        deleteContactId: '',
        mock: true
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
                if(data === ''){
                  this.contacts = []
                }
                else if(data.success){
                  this.contacts = data.data;
                }
                this.mock = false;
              });
          });
      },
      openDeleteContactDialog(contactId){
        this.deleteContactDialog = true;
        this.deleteContactId = contactId;
      },
      deleteContact() {
        this.deleteContactDialog = false;
        Axios.delete(`${BaseURL}/api/v1/contacts/delete/${this.deleteContactId}`)
          .then(({ data }) => {
            const snackbar = showSnackbar(data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
            Axios.get(`${BaseURL}/api/v1/contacts`)
              .then(({data}) => {
                if(data === ''){
                  this.contacts = []
                }
                else if(data.success){
                  this.contacts = data.data;
                }
              });
          }).catch((err) => {
            const snackbar = showSnackbar(err.response.data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
          });
      },
      favouriteContact (contactId, favourite){
        const requestBody = {
          id: contactId,
          favourite: favourite
        };
        Axios.post(`${BaseURL}/api/v1/contacts/modify`, requestBody)
          .then(({ data }) => {
            const snackbar = showSnackbar(data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
            Axios.get(`${BaseURL}/api/v1/contacts`)
              .then(({data}) => {
                if(data === ''){
                  this.contacts = []
                }
                else if(data.success){
                  this.contacts = data.data;
                }
              });
          }).catch((err) => {
            const snackbar = showSnackbar(err.response.data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
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
    },
    created() {
      Axios.get(`${BaseURL}/api/v1/contacts`)
        .then(({data}) => {
          if(data.success){
            this.contacts = data.data;
          }
        });
    }
  }
</script>

