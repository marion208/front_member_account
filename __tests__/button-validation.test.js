import { shallowMount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import ButtonValidation from './../src/pages/components/ButtonValidationForm.vue'

describe('Button validation', () => {
    it('has the right message', () => {
        const wrapper = shallowMount(ButtonValidation, {
            propsData: {
                msg: 'Validation'
            }
        })

        expect(wrapper.text()).toEqual(
            "Validation"
        );
    })
})