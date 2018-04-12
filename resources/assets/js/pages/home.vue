<template>
  <v-card>
    <v-card-text>
      {{ $t('you_are_logged_in') }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'home-view',
  metaInfo () {
    return { title: this.$t('home') }
  },
  created(){
       this.$store.dispatch('setPageInfo',{
        pageTitle:'Home Page',
        pageDesc:'This is home page',
       });
      }
}
</script>
