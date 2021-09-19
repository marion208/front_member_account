<template>
  <div class="page_connection">
    <div class="form_connection">
        <h1>Création d'un nouveau compte</h1>
        <div class="div_input">
            <p id="label_email">Adresse e-mail :</p>
            <input id="email_input">
        </div>
        <div class="div_input_conf">
            <p id="label_password">Mot de passe :</p>
            <VuePassword class="input_with_strength" type="password" id="password_input" @change="updateStrengthPassword" @paste.prevent :strength="strength" :value="refPassword" />
        </div>
        <div class="div_input_conf">
            <p  id="label_password_conf">Confirmation du mot de passe :</p>
            <VuePassword disableStrength type="password" id="password_input_conf" @change="checkPasswordsEquality" ref="conf_password" @paste.prevent :value="confPassword" />
            <p id="error_msg_conf_password"></p>
        </div>
        <div class="div_end_button">
            <ButtonValidationForm msg="Ajouter mon compte" id="button_add" @click.native="createNewAccount" />
        </div>
        <div class="div_input" id="link_connection">
            <p>Si vous avez déjà un compte, utiliser notre <a href="/" id="connection_link">formulaire de connexion</a></p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import './style.css'
import ButtonValidationForm from './components/ButtonValidationForm.vue'
import VuePassword from "vue-password"

export default {
  name: 'App',
  
  components: {
      ButtonValidationForm,
      VuePassword
  },
  data() {
        return {
            strength: 0,
            refPassword: '',
            confPassword: ''
        }
    },
  methods: {
      updateStrengthPassword: function() {
          var password = document.getElementById('password_input').value;
          var conf_password = document.getElementById('password_input_conf').value;
          var updatedStrength = 0;
          //eslint-disable-next-line
          var regexNumber = /\d/;
          //eslint-disable-next-line
          var regexUppercase = /[A-Z]/;
          //eslint-disable-next-line
          var regexSpecialChar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

          if (password.length >= 1) {
              updatedStrength += 1;
          }
          if (password.length >= 8) {
              updatedStrength += 1;
          }
          if (regexNumber.test(password && regexUppercase.test(password))) {
              updatedStrength += 1;
          }
          if (regexSpecialChar.exec(password)) {
              updatedStrength += 1;
          }
         this.strength = updatedStrength;
         this.refPassword = password;
         this.confPassword = conf_password;
      },
      checkPasswordsEquality: function() {
          var referencePassword = document.getElementById('password_input').value;
          var confPassword = document.getElementById('password_input_conf').value;
          if (referencePassword == confPassword) {
              document.getElementById('error_msg_conf_password').innerHTML = '';
          } else {
              document.getElementById('error_msg_conf_password').innerHTML = 'Les mots de passe indiqués doivent être identiques.';
          }
      },
      createNewAccount: function() {
          this.checkPasswordsEquality();
          var referencePassword = document.getElementById('password_input').value;
          var confPassword = document.getElementById('password_input_conf').value;
          if (referencePassword == confPassword && referencePassword.trim() != '') {
              var address_email = document.getElementById('email_input').value;
              var password_account = referencePassword;
              var newAccount = {
                "email_address": address_email,
                "password": password_account
                }; 
            var jsonNewAccount = JSON.stringify(newAccount);
            var linkPostApi = process.env.VUE_APP_API + 'api/member/new_account';
            axios.post(linkPostApi, jsonNewAccount, { headers: {'Content-Type': 'application/json'}})
             .then(response => {
              if (response.status == 404) {
                document.getElementById('error_msg_conf_password').innerHTML = 'Une erreur est parvenue. Un compte existe déjà avec cette adresse e-mail.';
            } else if (response.status == 201) {
                    sessionStorage.setItem('id_member', response.data.id_member);
                    sessionStorage.setItem('id_data_member', response.data.id_data_member);
                    sessionStorage.setItem('token', response.data.token);
                    window.location.href = "/profile";
            } else {
                document.getElementById('error_msg_conf_password').innerHTML = 'Une erreur est parvenue lors de la création du compte.';
            }
             });        
          }
      }
  }
}
</script>

<style>
#error_msg_conf_password {
    color: red;
    font-family: "Noto-Bold";
}
</style>
