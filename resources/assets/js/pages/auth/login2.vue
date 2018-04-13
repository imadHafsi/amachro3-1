<template>
<v-container fluid fill-height>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm8  lg4 >
      <v-card style="borderBottom:2px solid #389583;">
        <v-card-title style="backgroundColor:#389583;">
        </v-card-title>
        <progress-bar :show="busy"></progress-bar>
        <form @submit.prevent="login" @keydown="form.onKeydown($event)">
          <v-card-text>
        <v-flex xs8 offset-xs2>
          <v-layout>
            <v-flex xs4>
              <v-icon x-large 
              style="font-size: 6rem;color:#389583">lock_open</v-icon>
            </v-flex>
            <v-flex xs8>
                  <h2 style='color:#374767'>Human Resource Management</h2>
                  <strong>Login</strong>
            </v-flex>
          </v-layout>
        </v-flex>
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
</v-container>
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
