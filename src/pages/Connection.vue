<template>
  <div class="page_connection">
    <div class="form_connection">
        <h1>Connexion à votre espace membre</h1>
        <div class="div_input">
            <p id="label_email">Adresse e-mail :</p>
            <input id="mail_input">
        </div>
        <div class="div_input">
            <p id="label_password">Mot de passe :</p>
            <VuePassword disableStrength type="password" value=""  id="password_input" />
            <p id="error_msg_password"></p>
        </div>
        <div class="div_end_button">
            <ButtonValidationForm msg="Se connecter" id="button_connection" @click.native="accountConnection" />
        </div>
        <div class="div_input">
            <p id="link_new_account"><a href="/new_account" id="new_account_link">Créer un compte</a></p>
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
  methods: {
    accountConnection: function() {
        var address_email = document.getElementById('mail_input').value;
        var password_account = document.getElementById('password_input').value;
        if (address_email.trim() != '' && password_account.trim() != '') {
          var authAccount = {
            "email_address": address_email,
            "password": password_account
          }; 
        var jsonAuthAccount = JSON.stringify(authAccount);
          var linkPostApi = process.env.VUE_APP_API + 'api/member/login';
          axios.post(linkPostApi, jsonAuthAccount, { headers: {'Content-Type': 'application/json'}})
            .then(response => {
            if (response.status == 200) {
              sessionStorage.setItem('id_member', response.data.id_member);
              sessionStorage.setItem('id_data_member', response.data.id_data_member);
              sessionStorage.setItem('token', response.data.token);
              window.location.href = "/profile";
          } else {
              document.getElementById('error_msg_password').innerHTML = 'Une erreur est parvenue lors de la connexion. Veuillez vérifier votre mot de passe.';
          }
        })
      }
    }
  }
}
</script>

<style>
#error_msg_password {
    color: red;
    font-family: "Noto-Bold";
}
</style>
