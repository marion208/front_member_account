<template>
  <div>
    <div class="large_box">
        <h1>Votre profil</h1>
        <p id="button_deconnection" @click="deconnection" >Déconnexion</p>
      </div>
    <div class="box_container">
      <div class="box">
        <h2>Votre identité</h2>
        <p>Nom d'utilisateur</p>
        <input class="small_text_input" :value="userName" @focus="clearMessageUpdateProfile" id="id_input_username">
      </div>
      <div class="box">
        <h2>Votre identité</h2>
        <p>Date de naissance</p>
        <input type="date" id="birth_date_picker" :value="birthDate" @focus="clearMessageUpdateProfile">
        <p>Nom</p>
        <input class="small_text_input" :value="surname" @focus="clearMessageUpdateProfile" id="id_input_surname">
        <p>Prénom</p>
        <input class="small_text_input" :value="firstname" @focus="clearMessageUpdateProfile" id="id_input_firstname">
      </div>
      <div class="box">
        <h2>Votre adresse</h2>
        <p>Adresse ligne 1</p>
        <input class="big_text_input" :value="address_line_1" @focus="clearMessageUpdateProfile" id="id_input_address_line_1">
        <p>Adresse ligne 2</p>
        <input class="big_text_input" :value="address_line_2" @focus="clearMessageUpdateProfile" id="id_input_address_line_2">
        <p>Code postal</p>
        <input class="little_text_input" :value="postal_code" @focus="clearMessageUpdateProfile" id="id_input_postal_code">
        <p>Ville</p>
        <input class="little_text_input" :value="city" @focus="clearMessageUpdateProfile" id="id_input_city">
      </div>
      <div class="box">
        <ButtonValidationForm msg="Sauvegarder les modifications" id="button_save" @click.native="updateProfile" />
        <p id="msg_conf_update_profile"></p>
        <ButtonWarning msg="Supprimer mon compte" id="button_delete" @click.native="showModal = true" />
      </div>
    </div>
    <ModalConfDeleteAccount v-if="showModal" @close="showModal = false" id="modal_delete_account" >
        <!--
      you can use custom content here to overwrite
      default content
    -->
        <h3 slot="header">Attention</h3>
      </ModalConfDeleteAccount>
  </div>
</template>

<script>
import axios from 'axios'
import './style.css'
import ModalConfDeleteAccount from './components/ModalConfDeleteAccount.vue'
import ButtonValidationForm from './components/ButtonValidationForm.vue'
import ButtonWarning from './components/ButtonWarning.vue'

export default {
  components: {
    ModalConfDeleteAccount,
    ButtonValidationForm,
    ButtonWarning
  },
  data() {
    return {
        showModal: false,
        userName: '',
        birthDate: '',
        surname: '',
        firstname: '',
        address_line_1: '',
        address_line_2: '',
        postal_code: '',
        city: ''
    }
  },
  created: function() {
    if (sessionStorage.getItem('token') == null) {
      window.location.href = "/";
    } else {
      this.uploadProfile();
    }
  },
  methods: {
    uploadProfile: function() {
      var id_data_member = sessionStorage.getItem('id_data_member');
      var linkGetApi = process.env.VUE_APP_API + 'api/data_member/' + id_data_member;
      axios.get(linkGetApi, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
    }})
        .then(response => {
          this.userName = response.data.username;
          if (response.data.birth_date != null) {
            var birthDateFeedback = response.data.birth_date;
            var birthDateFormatted = new Date(birthDateFeedback);
            var yearBirthDate = birthDateFormatted.getFullYear();
            var monthBirthDate = birthDateFormatted.getMonth() + 1;
            if (monthBirthDate < 10) {
              monthBirthDate = '0' + monthBirthDate;
            }
            var dayBirthDate = birthDateFormatted.getDate();
            if (dayBirthDate < 10) {
              dayBirthDate = '0' + dayBirthDate;
            }
            this.birthDate = yearBirthDate + '-' + monthBirthDate + '-' + dayBirthDate;
          }          
          this.surname = response.data.surname;
          this.firstname = response.data.firstname;
          this.address_line_1 = response.data.address_line_1;
          this.address_line_2 = response.data.address_line_2;
          this.postal_code = response.data.postal_code;
          this.city = response.data.city;
          });
    },
    updateProfile: function() {
      var userName = document.getElementById('id_input_username').value;
      var birthDate = document.getElementById('birth_date_picker').value;
      var surname = document.getElementById('id_input_surname').value;
      var firstname = document.getElementById('id_input_firstname').value;
      var address_line_1 = document.getElementById('id_input_address_line_1').value;
      var address_line_2 = document.getElementById('id_input_address_line_2').value;
      var postal_code = document.getElementById('id_input_postal_code').value;
      var city = document.getElementById('id_input_city').value;
      var updatedProfile = {
          "username": userName,
          "birth_date": birthDate,
          "surname": surname,
          "firstname": firstname,
          "address_line_1": address_line_1,
          "address_line_2": address_line_2,
          "postal_code": postal_code,
          "city": city
          }; 
      var jsonUpdatedProfile = JSON.stringify(updatedProfile);
      var id_data_member = sessionStorage.getItem('id_data_member');
      var linkPostApi = process.env.VUE_APP_API + 'api/data_member/' + id_data_member;
      axios.post(linkPostApi, jsonUpdatedProfile, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + sessionStorage.getItem('token')
          }})
          .then(() => {
            this.uploadProfile();
            document.getElementById('msg_conf_update_profile').innerHTML = 'Vos modifications ont bien été enregistrées.';
            document.getElementById('msg_conf_update_profile').classList.add('success_update');
          });
    },
    clearMessageUpdateProfile: function() {
      document.getElementById('msg_conf_update_profile').innerHTML = '';
      document.getElementById('msg_conf_update_profile').className = '';
    },
    deconnection: function() {
      sessionStorage.removeItem('id_member');
      sessionStorage.removeItem('id_data_member');
      sessionStorage.removeItem('token');
      window.location.href = "/";
    }
  }
}
</script>

<style>
.large_box {
  background-color: white;
  padding: 2em;
  border-radius: 1em;
  box-shadow: 0 0 15px black;
  margin: 0.5em;
  display: flex;
  justify-content: space-between;
}
.large_box > h1 {
  margin: 0;
}
#button_deconnection {
  color: #9c0000;
  text-decoration: underline;
}
#button_deconnection:hover {
  cursor: pointer;
}
.box_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box {
  width: 500px;
  background-color: white;
  padding: 2em;
  border-radius: 1em;
  box-shadow: 0 0 15px black;
  margin: 0.5em;
}
@media only screen and (min-width: 800px) {
  .box {
    width: 50vw;
  }
}
@media only screen and (max-width: 800px) {
  .box {
    width: 80vw;
  }
}
.box > p {
  margin-bottom: 0;
}
.big_text_input, .small_text_input, select, input[type=date] {
  font-family: "Noto-Regular";
  font-size: 1em;
}
.big_text_input {
  min-width: 70%;
}
.little_text_input {
  min-width: 50%;
  font-family: "Noto-Regular";
  font-size: 1em;
}
.success_update {
  color: green;
  font-family: "Noto-Bold";
}
.failure_update {
  color: #9c0000;
  font-family: "Noto-Bold";
}
</style>
