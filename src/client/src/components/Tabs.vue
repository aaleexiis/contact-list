<template>
  <div>
    <v-tabs
      centered
      color="transparent"
      light
      icons-and-text
      v-model="tab"
    >
      <v-tabs-slider color="primary"></v-tabs-slider>

      <v-tab href="#tab-1">
        All contacts
        <v-icon>account_box</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        My favourites
        <v-icon>favorite</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        :value="'tab-1'"
        :key="1"
      >
        <contacts-list
          :contacts="contacts"
          :isFavourite="!favourite"
          @deleteContact="deleteContact"
          @favouriteContact="favouriteContact"
        ></contacts-list>
      </v-tab-item>
      <v-tab-item
        :value="'tab-2'"
        :key="2"
      >
        <contacts-list
          :contacts="contacts"
          :isFavourite="favourite"
          @deleteContact="deleteContact"
          @favouriteContact="favouriteContact"
        ></contacts-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
  import ContactsList from '@/components/ContactsList'

  export default {
    name: 'Tabs',
    components: {
      contactsList: ContactsList
    },
    data () {
      return {
        favourite: true,
        tab: 'tab-1'
      }
    },
    props: ['contacts'],
    methods: {
      deleteContact(contactId) {
        this.$emit('deleteContact', contactId);
      },
      favouriteContact (contactId, favourite){
        this.$emit('favouriteContact', contactId, favourite);
      }
    }
  }
</script>
