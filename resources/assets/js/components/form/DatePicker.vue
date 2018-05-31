<template>
  <div>
      <v-menu
        ref="menu"
        lazy
        :close-on-content-click="false"
        v-model="menu"
        :transition="transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
        :return-value.sync="_value"
      >
        <v-text-field
          slot="activator"
          :label="label"
          v-model="_value"
          :error-messages="errorMessages"
          :class="errorClass"
          :prepend-icon="prepend"
          readonly
        ></v-text-field>
        <v-date-picker v-model="_value" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(_value)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    <has-error :form="form" :field="name"></has-error>
  </div>
</template>

<script>
export default {
  name: 'date-picker',

  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hint: {
      type: String
    },
    vErrors: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    prepend: {
      type: String,
      default: ''
    },
    transition: {
      type: String,
      default: 'scale-transition'
    },
    value: {
      type: String
    }
  },
  data(){
    return {
      menu:false,
    }
  },
  watch:{
    _value(){
      if (this._value!==null)
        this.form.errors.clear(this.name)
    }
  },
  computed: {
    errorMessages () {
      return this.vErrors.collect(this.name)
    },
    errorClass () {
      return this.form.errors.has(this.name) && 'input-group--error error--text'
    },
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update:value', value.trim())
        this.$emit('input', value.trim())
      }
    }
  }
}
</script>
