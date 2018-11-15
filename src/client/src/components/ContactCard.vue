<template>
  <v-card color="transparent" light>
    <v-layout>
      <v-flex xs5>
        <v-img
          @click="openContact"
          src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
          height="125px"
          contain
        ></v-img>
      </v-flex>
      <v-flex xs7>
        <v-card-title primary-title>
            <div @click="openContact" class="headline">{{contact.name}} {{contact.surname}}</div>
        </v-card-title>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
      <v-icon
        :color="contact.favourite ? 'primary' : ''"
        @click="favouriteContact">star</v-icon>
      <v-spacer></v-spacer>
      <v-icon @click="editContact">edit</v-icon>
      <v-icon @click="deleteContact">delete</v-icon>
    </v-card-actions>
  </v-card>

</template>
<script>
  import router from '@/router'

  export default {
    name: 'ContactCard',
    data () {
      return {

      }
    },
    props: ['contact'],
    methods: {
      deleteContact () {
        this.$emit('deleteContact', this.contact._id);
      },
      favouriteContact (){
        this.$emit('favouriteContact', this.contact._id, !this.contact.favourite);
      },
      openContact () {
        router.push(`/contacts/view/${this.contact._id}`);
      },
      editContact () {
        router.push(`/contacts/view/${this.contact._id}?mode=edit`);
      }
    }
  }
</script>
