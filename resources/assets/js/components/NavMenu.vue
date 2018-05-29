<template>
  <div>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ name }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list two-line>
        <v-list-tile avatar :to="{ name: 'settings.profile' }">
          <v-list-tile-avatar><img :src="user.avatar"></v-list-tile-avatar>
          <v-list-tile-content>
          <v-list-tile-title v-html="user.name"></v-list-tile-title>
          <v-list-tile-sub-title>Last Login : {{user.last_login}}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <template v-for="(item, i) in items">
        <v-list-group 
              v-if="item.items"
              v-model="item.active"
              :prepend-icon="item.icon"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="subItem in item.items" 
              :key="subItem.title" exact router  ripple
              :to="subItem.route"
              v-bind:disabled='subItem.disabled'>
                <v-list-tile-action v-if='subItem.icon'>
                  <v-icon>{{ subItem.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-subheader v-else-if='item.header'>
             {{ item.header }}
            </v-subheader>
            <v-divider v-else-if='item.divider'></v-divider>
            <v-list-tile v-else :to='item.route' exact router  ripple  
              v-bind:disabled='item.disabled'  
              :title="item.title"> 
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if='item.subAction'>
            <v-icon class="blue--text">
              {{ item.subAction }}
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: this.$t('nav_menu_title'),
      items: [
          { header: 'Admin' },
          { title: 'dash', icon: 'dashboard', route: { name: 'home' } },
          {
            title: 'employees',
            icon: 'people',
            items: [
            { title: 'personel_info', route: { name: 'crud' },disabled:true },
            { title: 'qlfct', icon: 'school', route: { name: 'test' } },
            ]
          },
          { divider: true },
          { header: 'System' },
          { title: 'settings', icon: 'settings',
             route: { name: 'settings.profile' }}
        ]
    }
  },
  computed: {
  ...mapGetters({user: 'authUser'})
  },
}
</script>

<style scopped>

::-webkit-scrollbar {
    width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
     border-radius: 10px; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.2);
    border-radius: 10px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,.5);
}
</style>