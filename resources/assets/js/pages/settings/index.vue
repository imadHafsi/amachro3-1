<template>
  <v-layout row>
    <v-flex xs12>
        <v-card style="borderBottom:2px solid #389583;">
        <v-card-title class="primary">
        </v-card-title>
        <progress-bar :show="busy"></progress-bar>
        <v-tabs icons-and-text centered fixed>
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab href="#tab-person">
            {{ $t('profile') }}
            <v-icon>person</v-icon>
          </v-tab>
          <v-tab href="#tab-password">
            {{ $t('password') }}
            <v-icon>lock</v-icon>
          </v-tab>
          <v-tab href="#tab-theme">
            {{ $t('Theme') }}
            <v-icon>lock</v-icon>
          </v-tab>

          <v-tab-item id="tab-person">
            <v-layout row wrap>
              <profile-view v-on:busy="busy = $event"></profile-view>
            </v-layout>
          </v-tab-item>
          <v-tab-item id="tab-password">
            <v-layout row wrap>
              <password-view v-on:busy="busy = $event"></password-view>
            </v-layout>
          </v-tab-item>
          <v-tab-item id="tab-theme">
            <v-layout row wrap>
              <theme-view v-on:busy="busy = $event"></theme-view>
            </v-layout>
          </v-tab-item>

        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Profile from '~/pages/settings/profile'
import Password from '~/pages/settings/password'
import Theme from '~/pages/settings/theme'

export default {
  name: 'settings-view',
  components: {
    'profile-view': Profile,
    'password-view': Password,
    'theme-view': Theme
  },
  data () {
    return {
      busy: false
    }
  },
  created(){
       this.$store.dispatch('setPageInfo',{
        pageTitle:'Setting',
        pageDesc:'Edit setting page',
       });
  }
}
</script>
