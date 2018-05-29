<template>
<v-container fluid fill-height>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 sm8  lg4 >
      <v-card style="borderBottom:2px solid #389583;">
        <v-card-title style="backgroundColor:#389583;">
        </v-card-title>
        <progress-bar :show="busy"></progress-bar>
        <form @submit.prevent="register" @keydown="form.onKeydown($event)">
         <v-card-text>
          <v-flex xs8 offset-xs2>
            <v-layout>
              <v-flex xs4>
                <v-icon x-large 
                style="font-size: 6rem;color:#389583">person_add</v-icon>
              </v-flex>
              <v-flex xs8>
                    <h2 style='color:#374767'>Human Resource Management</h2>
                    <strong>Register</strong>
              </v-flex>
            </v-layout>
          </v-flex>
  
            <!-- Name -->
            <text-input
              :form="form"
              :label="$t('name')"
              :v-errors="errors"
              :value.sync="form.name"
              counter="30"
              name="name"
              v-validate="'required|max:30'"
            ></text-input>

            <!-- Email -->
            <email-input
              :form="form"
              :label="$t('email')"
              :v-errors="errors"
              :value.sync="form.email"
              name="email"
              v-validate="'required|email'"
            ></email-input>

            <!-- Password -->
            <password-input
              :form="form"
              :hint="$t('password_length_hint')"
              :v-errors="errors"
              :value.sync="form.password"
              v-on:eye="eye = $event"
              v-validate="'required|min:8'"
            ></password-input>

            <!-- Password Confirmation -->
            <password-input
              :form="form"
              :hide="eye"
              :label="$t('confirm_password')"
              :v-errors="errors"
              :value.sync="form.password_confirmation"
              data-vv-as="password"
              hide-icon="true"
              name="password_confirmation"
              v-validate="'required|confirmed:password'"
            ></password-input>
            <submit-button :block="true" :form="form" :label="$t('register')"></submit-button>
          </v-card-text>

          <v-card-actions>
            <router-link :to="{ name: 'login' }">
              {{ $t('login') }}
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
  name: 'register-view',
  layout: 'default',
  metaInfo () {
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    eye: true,
    busy: false
  }),

  methods: {
    async register () {
      if (await this.formHasErrors()) return

      try{
        this.busy = true
      // Register the user.
      const { data } = await this.form.post('/api/register')

      // Log in the user.
      const { data: { token }} = await this.form.post('/api/login')

      // Save the token.
      this.$store.dispatch('saveToken', { token })

      // Update the user.
      await this.$store.dispatch('updateUser', { user: data })

      this.busy = false
      
      // Redirect home.
      this.$router.push({ name: 'home' })

      this.$toasted.show("You are successfully registred", { 
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
