import { shallowMount } from '@vue/test-utils'
import Profile from './../src/pages/ProfileEdit.vue'

const factory = (values = {}) => {
    return shallowMount(Profile, {
        data() {
            return {
                ...values
            }
        }
    })
}

describe('Profile page', () => {
    it('has a title', () => {
        const wrapper = factory();

        expect(wrapper.find("h1").text()).toEqual(
            "Votre profil"
        );
    })
    it('has a button for deconnection', () => {
        const wrapper = factory();

        expect(wrapper.find("#button_deconnection").text()).toEqual(
            "Déconnexion"
        );
    })
    it('has a subtitle', () => {
        const wrapper = factory();

        expect(wrapper.find("h2").text()).toEqual(
            "Votre identité"
        );
    })
    it('has an input for the username', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_username").exists()).toBeTruthy();
    })
    it('has an input for the birth date', () => {
        const wrapper = factory();

        expect(wrapper.find("#birth_date_picker").exists()).toBeTruthy();
    })
    it('has an input for the surname', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_surname").exists()).toBeTruthy();
    })
    it('has an input for the firstname', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_firstname").exists()).toBeTruthy();
    })
    it('has an input for the address line 1', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_address_line_1").exists()).toBeTruthy();
    })
    it('has an input for the address line 2', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_address_line_2").exists()).toBeTruthy();
    })
    it('has an input for the postal code', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_postal_code").exists()).toBeTruthy();
    })
    it('has an input for the city', () => {
        const wrapper = factory();

        expect(wrapper.find("#id_input_city").exists()).toBeTruthy();
    })
    it('has a button to save the informations', () => {
        const wrapper = factory();

        expect(wrapper.find("#button_save").exists()).toBeTruthy();
    })
    it('has a button to delete the account', () => {
        const wrapper = factory();

        expect(wrapper.find("#button_delete").exists()).toBeTruthy();
    })
    it('delete the data storage on session after deconnection', async () => {
        const wrapper = factory();

        await wrapper.find("#button_deconnection").trigger('click');
        expect(sessionStorage.getItem('id_member')).not.toBeTruthy();
        expect(sessionStorage.getItem('id_data_member')).not.toBeTruthy();
        expect(sessionStorage.getItem('token')).not.toBeTruthy();
    })
    it('redirect to the homepage after deconnection', async () => {
        const wrapper = factory();

        await wrapper.find("#button_deconnection").trigger('click');
        expect(global.window.location.pathname).toEqual('/');
    })
})