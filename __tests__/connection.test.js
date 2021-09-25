import { shallowMount } from '@vue/test-utils'
import Connection from './../src/pages/Connection.vue'

const factory = (values = {}) => {
    return shallowMount(Connection, {
        data() {
            return {
                ...values
            }
        }
    })
}

describe('Connection form', () => {
    it('has a title', () => {
        const wrapper = factory();

        expect(wrapper.find("h1").text()).toEqual(
            "Connexion à votre espace membre"
        );
    })
    it('has a label for the e-mail input', () => {
        const wrapper = factory();

        expect(wrapper.find("#label_email").text()).toEqual(
            "Adresse e-mail :"
        );
    })
    it('has an input for the e-mail', () => {
        const wrapper = factory();

        expect(wrapper.find("#mail_input").exists());
    })
    it('has a label for the password input', () => {
        const wrapper = factory();

        expect(wrapper.find("#label_password").text()).toEqual(
            "Mot de passe :"
        );
    })
    it('has an input for the password', () => {
        const wrapper = factory();

        expect(wrapper.find("#password_input").exists());
    })
    it('has a button in order to connect', () => {
        const wrapper = factory();

        expect(wrapper.find("#button_connection").exists());
    })
    it('has a text to show how redirect to the page to create a new account', () => {
        const wrapper = factory();

        expect(wrapper.find("#link_new_account").text()).toEqual(
            "Créer un compte"
        );
    })
    it('has a link to redirect to the page to create a new account', () => {
        const wrapper = factory();

        expect(wrapper.find("#new_account_link").attributes('href')).toEqual('/new_account');
    })
})