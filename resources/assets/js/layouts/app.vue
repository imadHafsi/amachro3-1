<template>
  <v-app light>
    <v-navigation-drawer 
      v-if="authenticated" 
      persistent 
      v-model="drawer" 
      enable-resize-watcher 
      app
    >
      <nav-menu></nav-menu>
    </v-navigation-drawer>
    <tool-bar v-on:toggleDrawer="drawer = !drawer" :drawer="drawer"></tool-bar>
    <v-content>
      <v-container fluid>
        <v-card class="pageInfo">
          <v-card-text>
            <span class="headline">{{ pageInfo.pageTitle }}</span>
            <span>{{ pageInfo.pageDesc }}</span>
            <span v-text="currentTime" 
              style="display: inline-block;"
            class='headline right'></span>
          </v-card-text>
        </v-card>
        <transition name="page" mode="out-in">
            <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <feedback-message></feedback-message>
    <page-footer></page-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import * as moment from 'moment' 

import NavMenu from '~/components/NavMenu'
import ToolBar from '~/components/ToolBar'
import FeedbackMessage from '~/components/FeedbackMessage'
import PageFooter from '~/components/PageFooter'

export default {
  components: {
    'nav-menu': NavMenu,
    'tool-bar': ToolBar,
    'feedback-message': FeedbackMessage,
    'page-footer': PageFooter
  },

  computed: mapGetters({
    authenticated: 'authCheck',
    pageInfo:'pageInfo'
  }),

  data () {
    return {
      drawer: true,
      currentTime:null
    }
  },
  created(){
      this.currentTime = moment().format('LTS');
          setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  methods:{
    updateCurrentTime(){
      this.currentTime = moment().format('LTS');
    }
  }
}
</script>
