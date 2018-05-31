<template>
  <v-card class="primary-border-bottom">
    <v-card-title class="primary">
    </v-card-title>
    <v-card-text class="primary--text">
      {{ $t('you_are_logged_in') }}
      <v-btn @click="change" class="primary">Change</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'home-view',
  metaInfo () {
    return { title: this.$t('home') }
  },
  methods:{
    change(){
      this.$vuetify.theme.primary='#389583';
      console.log("this.$vuetify", this.$vuetify);

      this.$toasted.show("You are successfully logged in", { 
               theme: "primary",
               icon:'done'
            });
    }
  },
  created(){
       this.$store.dispatch('setPageInfo',{
        pageTitle:'Users Page',
        pageDesc:'Show and Edit All Users',
       });
      }
}
</script>
