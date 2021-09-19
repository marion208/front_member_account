import Vue from 'vue'
import Connection from './pages/Connection.vue'
import CreateAccount from './pages/CreateAccount.vue'
import ProfileEdit from './pages/ProfileEdit.vue'
import NotFound from './pages/NotFound.vue'
import CustomGoogleAutocomplete from 'vue-custom-google-autocomplete'

const routes = {
  '/': Connection,
  '/new_account': CreateAccount,
  '/profile': ProfileEdit
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound
    }
  },
  render(h) { return h(this.ViewComponent) }
})

Vue.use(CustomGoogleAutocomplete)
