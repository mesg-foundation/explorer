import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default () => {
  library.add(faCopy)
  Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)
}
