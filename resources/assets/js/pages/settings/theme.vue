<template>
<v-flex sm8 offset-sm2>
  <v-card flat>
      <form @submit.prevent="update" @keydown="form.onKeydown($event)">
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <v-layout row wrap>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.primary"></color-input>
                  </v-flex>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.secondary"></color-input>
                  </v-flex>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.accent"></color-input>
                  </v-flex>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.error"></color-input>
                  </v-flex>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.info"></color-input>
                  </v-flex>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.warning"></color-input>
                  </v-flex>
                  <v-flex sm3 xs6>
                    <color-input title="Priamry" :value.sync="form.success"></color-input>
                  </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
        </v-card-text>
        <v-card-actions>
          <submit-button :flat="true" :form="form" :label="$t('update')"></submit-button>
        </v-card-actions>
      </form>
  </v-card>
</v-flex>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
import { Material } from 'vue-color'

export default {
  name: 'profile-view',
  components: {
    'photoshop-picker': Material
  },
  data: () => ({
    colors:'#194d33',
    primaryColor:'#194d33',
    form: new Form({
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    })
  }),
  computed: mapGetters({
    user: 'authUser'
  }),
  watch:{
    form:{
      handler(){
          this.$vuetify.theme.primary=this.form.primary
          console.log("this.$vuetify.theme.primary", this.$vuetify.theme.primary);
        },
        deep:true
    }
  },
  created () {

  },
  methods: {
    async update () {
      if (await this.formHasErrors()) return
      this.$emit('busy', true)

      const { data } = await this.form.patch('/api/settings/profile')

      await this.$store.dispatch('updateUser', { user: data })
      this.$emit('busy', false)

      this.$store.dispatch('responseMessage', {
        type: 'success',
        text: this.$t('info_updated')
      })
    }
  }
}
</script>

