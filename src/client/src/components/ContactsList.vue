<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-if="!isFavourite"
              md3 sm6 xs6
              :key="'addNew'"
              text-xs-center
            >
              <v-btn outline large fab color="primary" @click="createContact">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
            <v-flex
              v-for="contact in contacts"
              v-if="(contact.favourite && isFavourite) || !isFavourite"
              md3 sm6 xs6
              :key="contact.email"
            >
              <contact-card
                :contact="contact"
                @deleteContact="deleteContact"
                @favouriteContact="favouriteContact"
              ></contact-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import ContactCard from '@/components/ContactCard'
  import router from '@/router'

  export default {
    name: 'ContactList',
    components: {
      contactCard: ContactCard
    },
    data() {
      return {}
    },
    props: ['contacts', 'isFavourite'],
    methods: {
      deleteContact(contactId) {
        this.$emit('deleteContact', contactId);
      },
      favouriteContact (contactId, favourite){
        this.$emit('favouriteContact', contactId, favourite);
      },
      createContact(){
        router.push('contacts/create')
      }
    }
  }
</script>
