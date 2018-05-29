<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2 lg4 offset-lg4>
      <v-card>
        <progress-bar :show="busy"></progress-bar>
        <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ $t('login') }}</h3>
          </v-card-title>
          <v-card-text>

            <!-- Email -->
            <email-input
              :form="form"
              :label="$t('email')"
              :v-errors="errors"
              :value.sync="form.email"
              name="email"
              prepend="person_outline"
              v-validate="'required|email'"
            ></email-input>

            <!-- Password -->
            <password-input
              :v-errors="errors"
              :form="form"
              :value.sync="form.password"
              prepend="lock_outline"
              v-validate="'required|min:8'"
            ></password-input>

            <!-- Remember Me -->
            <v-checkbox
              :label="$t('remember_me')"
              color="primary"
              type="checkbox"
              v-model="remember"
              value="true"
            ></v-checkbox>

            <submit-button :block="true" :form="form" :label="$t('login')"></submit-button>

          </v-card-text>
          <v-card-actions>
            <router-link :to="{ name: 'register' }">
              {{ $t('register') }}
            </router-link>
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'password.request' }">
              {{ $t('forgot_password') }}
            </router-link>
          </v-card-actions>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Form from 'vform'

export default {
  name: 'login-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('login') }
  },
  data: () => ({
    form: new Form({
      email: 'imad95@gmail.com',
      password: '12457805'
    }),
    eye: true,
    remember: false,
    busy: false
  }),

  methods: {
    async login () {
      if (await this.formHasErrors()) return
      this.busy = true
      try
      {
        // Submit the form.
            const { data } = await this.form.post('/api/login')
            
            console.log("Login", data);
      
            // Save the token.
            this.$store.dispatch('saveToken', {
              token: data.token,
              remember: this.remember
            })
      
            // Fetch the user.
            await this.$store.dispatch('fetchAuthData')
            this.busy = false
          
            // Redirect home.
            this.$router.push({ name: 'home' })

            this.$toasted.show("You are successfully logged in", { 
               theme: "success",
               icon:'done'
            });
      }
      catch(e)
      {
        this.busy = false
      }
    }
  }
}
</script>
