<template>
  <v-layout row wrap>
    <v-spacer></v-spacer>
    <v-flex xs4>
      <v-text-field
        label="Label"
        v-model="label"
        :disabled="mode === 'view'"
      ></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs4>
      <v-text-field
        label="Number"
        v-model="number"
        :disabled="mode === 'view'"
      ></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs1>
      <v-btn fab small color="secondary" @click="$emit('remove')">
        <v-icon>remove</v-icon>
      </v-btn>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
</template>
<script>
  export default {
    name: 'Phone',
    data: () => ({
        label: '',
        number: ''
    }),
    props: ['propLabel', 'propNumber', 'mode'],
    created() {
      if(this.propLabel){
        this.label = this.propLabel;
      }

      if(this.propNumber){
        this.number = this.propNumber;
      }
    }
  }
</script>
