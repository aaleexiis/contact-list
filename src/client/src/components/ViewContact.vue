<template>
  <main class="l-home-page">
    <app-header></app-header>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card color="transparent" light flat>
            <v-layout row>
              <v-flex xs5>
                <v-avatar v-if="avatar"
                  :size="avatarSize"
                  color="grey lighten-4"
                >
                  <img :src="avatar" alt="avatar">
                </v-avatar>
                <avatar v-else :fullname="`${name} ${surname}`" :size="avatarSize"></avatar>
              </v-flex>
            </v-layout>
            <v-layout row>
              <picture-input v-if="mode === 'edit'"
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
              <v-spacer></v-spacer>
              <v-flex xs1 text-xs-center>
                <v-icon
                  v-model="favourite"
                  :color="favourite ? 'primary' : ''"
                  @click="favourite=!favourite">star</v-icon>
              </v-flex>
              <v-flex v-if="mode === 'view'"xs1 text-xs-center>
                <v-icon
                  @click="mode = 'edit'">edit</v-icon>
              </v-flex>
              <v-flex v-if="mode === 'edit'"xs1 text-xs-center>
                <v-icon
                  @click="openDeleteContactDialog">delete</v-icon>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4 text-xs-center>
                <v-subheader>Name</v-subheader>
              </v-flex>
            </v-layout>
            <v-text-field
              :disabled="this.mode === 'edit' ? false : true"
              v-model="name"
            ></v-text-field>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Surname</v-subheader>
              </v-flex>
            </v-layout>
            <v-text-field
              :disabled="this.mode === 'edit' ? false : true"
              v-model="surname"
            ></v-text-field>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Email</v-subheader>
              </v-flex>
            </v-layout>
            <v-text-field
              :disabled="this.mode === 'edit' ? false : true"
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
                   :propLabel="loadedPhonesCount > child.id ? phones[child.id].label : ''"
                   :propNumber="loadedPhonesCount > child.id ? phones[child.id].number : ''"
                   :mode="mode"
                   @remove="removePhone(index, child.id)"
            ></phone>
            <v-flex v-if="mode === 'edit'" xs1>
              <v-btn slot="activator" @click="addPhone()" fab small color="info">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
            <v-btn
              v-if="mode === 'edit'"
              outline
              @click="cancel"
              color="error">
              Cancel
            </v-btn>
            <v-btn
              v-if="mode === 'edit'"
              outline
              @click="save"
              color="primary">
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
  import Vue from 'vue'
  import Phone from '@/components/Phone'
  import PictureInput from 'vue-picture-input'
  import router from '@/router'
  import Axios from 'axios'
  import {BaseURL, showSnackbar} from '@/utils/utils'
  import VueInitialsImg from 'vue-initials-img';
  import VueLetterAvatar from 'vue-letter-avatar';
  import Avatar from 'vue-avatar-component'

  Vue.use(VueInitialsImg);
  Vue.use(VueLetterAvatar);

  export default {
    name: 'ViewContact',
    components: {
      phone: Phone,
      PictureInput,
      Avatar
    },
    data: () => ({
      snackbarText: '',
      snackbarColor: '',
      snackbarTimeout: 6000,
      snackbar: false,
      name: '',
      surname: '',
      image: null,
      avatar: null,
      email: '',
      favourite: false,
      children: [],
      phones: [],
      loadedPhonesCount: 0,
      phoneId: 0,
      contactId: '',
      mode: 'view',
      deleteContactDialog: false,
      avatarSize: 96
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
        for(let index in phoneComponents){
          this.phones.push({
            label: phoneComponents[index].label,
            number: phoneComponents[index].number
          })
        }

        debugger
        const modifiedContact = {
          id: this.contactId,
          name: this.name,
          surname: this.surname,
          image: this.image,
          email: this.email,
          favourite: this.favourite,
          phone: this.phones
        }

        Axios({
          method: 'post',
          url: '/api/v1/contacts/modify',
          baseURL: BaseURL,
          data: modifiedContact
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
      openDeleteContactDialog(){
        this.deleteContactDialog = true;
      },
      deleteContact() {
        this.deleteContactDialog = false;
        Axios.delete(`${BaseURL}/api/v1/contacts/delete/${this.contactId}`)
          .then(({ data }) => {
            const snackbar = showSnackbar(data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
            router.push('/');
          }).catch((err) => {
            const snackbar = showSnackbar(err.response.data);
            this.snackbarText = snackbar.snackbarText;
            this.snackbarColor = snackbar.snackbarColor;
            this.snackbar = snackbar.snackbar;
        });
      },
      onImageChange (image) {
        if (image) {
          this.avatar = image;
          image = image.replace('data:image/jpeg;base64,', '');
          this.image = Buffer.from(image, 'base64')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      }
    },
    created() {
      this.contactId = this.$route.params.id;
      this.mode = this.$route.query.mode ? this.$route.query.mode : this.mode;
      Axios.get(`${BaseURL}/api/v1/contacts?id=${this.contactId}`)
        .then(({data}) => {
          this.name = data.data[0].name;
          this.surname = data.data[0].surname;
          if(data.data[0].image) {
            debugger
            this.image = data.data[0].image.data.data; //save for edit
            let picture64Bit = data.data[0].image.data.data; //convert to bas64 for avatar display
            picture64Bit = Buffer(picture64Bit, 'binary').toString('base64');
            this.avatar = `data:image/png;base64,${picture64Bit}`;
          }
          this.email = data.data[0].email;
          this.favourite = data.data[0].favourite;
          this.phones = data.data[0].phone;
          if(this.phones.length > 0){
            this.loadedPhonesCount = this.phones.length;
            for(let phone in this.phones){
              this.addPhone();
            }
          }
        })
    }
  }
</script>
