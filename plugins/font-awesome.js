import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faCoins, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default () => {
  library.add(faCopy, faCoins, faTag)
  Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)
}
