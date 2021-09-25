import { shallowMount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import { h } from 'vue'
import NotFound from './../src/pages/NotFound.vue'

const factory = (values = {}) => {
    return shallowMount(NotFound, {
        data() {
            return {
                ...values
            }
        }
    })
}

describe('Page not found', () => {
    it('has a heading', () => {
        const wrapper = factory();

        expect(wrapper.find(".sub_sign_error").text()).toEqual(
            "Wrong way"
        );
    })
    it('has a title', () => {
        const wrapper = factory();

        expect(wrapper.find("h1").text()).toEqual(
            "Erreur 404"
        );
    })
    it('has a text to show how redirect to the page to create a new account', () => {
        const wrapper = factory();

        expect(wrapper.find("#new_account_link").text()).toEqual(
            "Créer un compte"
        );
    })
    it('has a link to redirect to the page to create a new account', () => {
        const wrapper = factory();

        expect(wrapper.find("#new_account_link").attributes('href')).toEqual('/new_account');
    })
    it('has a text to show how redirect to the connexion page', () => {
        const wrapper = factory();

        expect(wrapper.find("#connection_link").text()).toEqual(
            "Connexion à un compte déjà existant"
        );
    })
    it('has a link to redirect to the connection page', () => {
        const wrapper = factory();

        expect(wrapper.find("#connection_link").attributes('href')).toEqual('/');
    })
    it('has a text to show how redirect to the profile page', () => {
        const wrapper = factory();

        expect(wrapper.find("#profile_link").text()).toEqual(
            "Retourner sur mon profil"
        );
    })
    it('has a link to redirect to the profil page', () => {
        const wrapper = factory();

        expect(wrapper.find("#profile_link").attributes('href')).toEqual('/profile');
    })
})