<template>
	<div class="vc-material">
		<div class="vc-editable-input vc-material-hex" :style="borderBottom">
			<input aria-label="#194D33" class="vc-input__input" v-model="_value">
			 <span class="vc-input__label">{{title}}</span> 
		</div> 
	</div>
</template>
<script>
export default {
  name: 'color-input',

  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },

  computed: {
  	borderBottom(){
  		return {
  			borderBottom:'30px solid '+this._value
  		}
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


<style lang="stylus" scoped>

.vc-material
	width: 98px !important;
	height: 98px !important;
	padding: 5px 16px;
	font-family: "Roboto";
	position: relative;
	border-radius: 2px;
	box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
	background-color: #fff;
	width: 100%;
	margin-top: 12px;
	font-size: 15px;
	color: #333;
	height: 30px;
	
.vc-editable-input
	position:relative;
	
    
.vc-material-hex
	border-bottom-width: 2px;
	border-bottom-style: solid;

.vc-input__input
	width: 100%;
	margin-top: 12px;
	font-size: 15px;
	color: #333;
	height: 42px;
	padding: 0;
	border: 0;
	outline: none;
    
.vc-input__label
	position: absolute;
	top: 0;
	left: 0;
	font-size: 12px;
	font-weight: bold;
	color: #757474;
	text-transform: capitalize;


</style>