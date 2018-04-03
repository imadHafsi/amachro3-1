import Vue from 'vue'

// register the plugin on vue
import Toasted from 'vue-toasted';

const options={ 
	 position: "bottom-right", 
	 duration : 5000,
	 className:'Toasted'
}


Vue.use(Toasted,options)
