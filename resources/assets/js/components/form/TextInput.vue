<template>
  <div>
    <v-text-field
      :class="errorClass"
      :counter="counter"
      :error-messages="errorMessages"
      :hint="hint"
      :label="label"
      :name="name"
      :prepend-icon="prepend"
      :multi-line="multiLine"
      v-model="_value"
      :hide-details="hideDetails"
    ></v-text-field>
    <has-error :form="form" :field="name"></has-error>
  </div>
</template>

<script>
export default {
  name: 'text-input',

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
    counter: {
      type: [Boolean, Number, String],
      default: false
    },
    multiLine: {
      type: [Boolean],
      default: false
    },
    hideDetails: {
      type: [Boolean],
      default: false
    },
    value: {
      type: String
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
