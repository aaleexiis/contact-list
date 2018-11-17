<template>
  <v-card color="transparent" light>
    <v-layout>
      <v-flex xs5>
        <v-avatar v-if="image"
                  :size="avatarSize"
                  color="grey lighten-4"
        >
          <img :src="image" alt="avatar">
        </v-avatar>
        <avatar v-else :size="avatarSize" :fullname="`${contact.name} ${contact.surname}`" ></avatar>
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
  import Avatar from 'vue-avatar-component'

  export default {
    name: 'ContactCard',
    components: {
      Avatar
    },
    data () {
      return {
        avatarSize: 96,
        image: null
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
    },
    created() {
      if(this.contact.image && this.contact.image.data) {
        let picture64Bit = this.contact.image.data.data;
        picture64Bit = Buffer(picture64Bit, 'binary').toString('base64');
        this.image = `data:image/png;base64,${picture64Bit}`;
      }
    }
  }
</script>
