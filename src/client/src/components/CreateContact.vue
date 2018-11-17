<template>
  <main class="l-home-page">
    <app-header></app-header>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card color="transparent" light flat>
            <v-layout>
              <picture-input
                ref="pictureInput"
                width="600"
                height="600"
                margin="16"
                accept="image/jpeg,image/png"
                size="5"
                button-class="v-btn outline info"
                @change="onImageChange">
              </picture-input>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md8>
          <v-card color="transparent" light flat>
            <v-layout row>
              <v-flex xs1 text-xs-center>
                <v-btn flat icon large color="secondary" @click="cancel">
                  <v-icon>arrow_back</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4 text-xs-center>
                <v-subheader>Name</v-subheader>
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="name"
            ></v-text-field>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Surname</v-subheader>
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="surname"
            ></v-text-field>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Email</v-subheader>
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="email"
            ></v-text-field>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Numbers</v-subheader>
              </v-flex>
            </v-layout>
            <phone v-for="(child, index) in children"
                   :pkey="child.id"
                   :key="child.id"
                   @remove="removePhone(index, child.id)"
            ></phone>
            <v-flex xs1>
              <v-btn slot="activator" @click="addPhone()" fab small color="info">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
            <v-btn outline @click="cancel" color="error">
              Cancel
            </v-btn>
            <v-btn outline @click="save" color="primary">
              Save
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
  import Phone from '@/components/Phone'
  import PictureInput from 'vue-picture-input'
  import router from '@/router'
  import Axios from 'axios'
  import {BaseURL, showSnackbar} from '@/utils/utils'

  export default {
    name: 'CreateContact',
    components: {
      phone: Phone,
      PictureInput
    },
    data: () => ({
      snackbarText: '',
      snackbarColor: '',
      snackbarTimeout: 6000,
      snackbar: false,
      name: '',
      surname: '',
      email: '',
      children: [],
      phones: [],
      phoneId: 0,
      image: null
    }),

    methods: {
      addPhone () {
        this.children.push({
          id: this.phoneId++
        });
      },
      removePhone (index, id){
        this.children.splice(index, 1);
        this.phones = this.phones.filter(phone => phone.key !== id);
      },
      save(){
        this.phones = [];
        const phoneComponents = this.$children[2].$children.filter(child => { return child.$options.name === "Phone" });
        debugger;
        for(let index in phoneComponents){
          this.phones.push({
            label: phoneComponents[index].label,
            number: phoneComponents[index].number
          })
        }

        const newContact = {
          name: this.name,
          surname: this.surname,
          image: this.image,
          email: this.email,
          favourite: false,
          phone: this.phones
        };

        Axios({
          method: 'post',
          url: '/api/v1/contacts/create',
          baseURL: BaseURL,
          data: newContact
        }).then(({data}) => {
          const snackbar = showSnackbar(data);
          this.snackbarText = snackbar.snackbarText;
          this.snackbarColor = snackbar.snackbarColor;
          this.snackbar = snackbar.snackbar;
        }).catch(err => {
          this.snackbarText = `Error while creating new contact`;
          this.snackbarColor = 'error';
          this.snackbar = true;
        });
      },
      cancel(){
        router.push('/')
      },
      onImageChange (image) {
        if (image) {
          debugger
          image = image.replace('data:image/jpeg;base64,', '');
          this.image = Buffer.from(image, 'base64')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      }
    }
  }
</script>
