import { shallowMount } from '@vue/test-utils'
import CreateAccount from './../src/pages/CreateAccount.vue'

const factory = (values = {}) => {
    return shallowMount(CreateAccount, {
        data() {
            return {
                ...values
            }
        }
    })
}

describe('New account form', () => {
    it('has a title', () => {
        const wrapper = factory();

        expect(wrapper.find("h1").text()).toEqual(
            "Création d'un nouveau compte"
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
    it('has a label for the password input confirmation', () => {
        const wrapper = factory();

        expect(wrapper.find("#label_password_conf").text()).toEqual(
            "Confirmation du mot de passe :"
        );
    })
    it('has an input for the e-mail confirmation', () => {
        const wrapper = factory();

        expect(wrapper.find("#password_input_conf").exists());
    })
    it('has a button in order to add a new account', () => {
        const wrapper = factory();

        expect(wrapper.find("#button_add").exists());
    })
    it('has a text to show how redirect to the connection page', () => {
        const wrapper = factory();

        expect(wrapper.find("#link_connection").text()).toEqual(
            "Si vous avez déjà un compte, utiliser notre formulaire de connexion"
        );
    })
    it('has a link to redirect to the connection page', () => {
        const wrapper = factory();

        expect(wrapper.find("#connection_link").attributes('href')).toEqual("/");
    })
    it('correctly redirect to the connection page when click', async () => {
        const wrapper = factory();

        await wrapper.find("#connection_link").trigger('click');
        expect(global.window.location.pathname).toEqual('/');
    })
    it('method check password equality is OK when right', () => {
        const wrapper = factory();

        wrapper.find("#password_input").value = "password_one";
        wrapper.find("#password_input_conf").value = "password_one";
        expect(wrapper.find("#error_msg_conf_password").text()).toEqual('');
    })
})