import { shallowMount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import ButtonWarning from './../src/pages/components/ButtonWarning.vue'

describe('Button warning', () => {
    it('has the right message', () => {
        const wrapper = shallowMount(ButtonWarning, {
            propsData: {
                msg: 'Attention'
            }
        })

        expect(wrapper.text()).toEqual(
            "Attention"
        );
    })
})