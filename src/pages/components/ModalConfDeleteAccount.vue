<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  Souhaitez-vous vraiment supprimer votre compte ?
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <ButtonValidationForm msg="Annuler" id="button_cancel" @click.native="$emit('close')" /><br/>
                  <ButtonWarning msg="Confirmer la suppression" id="button_confirm_delete" @click.native="deleteAccount" />
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
import axios from 'axios'
import './../style.css'
import ButtonValidationForm from './ButtonValidationForm.vue'
import ButtonWarning from './ButtonWarning.vue'

export default {
  name: 'ModalConfDeleteAccount',
  components: {
    ButtonValidationForm,
    ButtonWarning
  },
  methods: {
      deleteAccount: function() {
          var member_id = sessionStorage.getItem('id_member');
          var linkDeleteApi = process.env.VUE_APP_API + 'api/member/' + member_id;
          axios.delete(linkDeleteApi, { 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + sessionStorage.getItem('token')
              }})
            .then(() => {
              sessionStorage.removeItem('id_member');
              sessionStorage.removeItem('id_data_member');
              sessionStorage.removeItem('token');
              window.location.href = "/";
              });
      }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #9c0000;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
  font-family: "Noto-Bold";
  font-size: 1.05em;
  text-align: center;
}

.modal-default-button {
  float: right;
}

.modal-footer {
    margin-bottom: 0.5em;
    text-align: center;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
