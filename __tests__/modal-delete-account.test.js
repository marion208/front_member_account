import { shallowMount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import ModalConfDeleteAccount from './../src/pages/components/ModalConfDeleteAccount.vue'

const factory = (values = {}) => {
    return shallowMount(ModalConfDeleteAccount, {
        data() {
            return {
                ...values
            }
        }
    })
}

const feedbackMockedData = {
    message: 'Deleted'
};

const server = setupServer(
    rest.delete('http://localhost:3000/api/member/1', (req, res, ctx) => {
        return res(ctx.json({ feedbackMockedData }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Modal to confirme the deletion', () => {
    it('should have a header', async () => {
        const wrapper = factory();

        expect(wrapper.find(".modal-body").text()).toEqual(
            "Souhaitez-vous vraiment supprimer votre compte ?"
        );
    })
    it('contain a button to cancel', async () => {
        const wrapper = factory();

        expect(wrapper.find("#button_cancel").exists()).toBeTruthy();
    })
    it('contain a button to confirm', async () => {
        const wrapper = factory();

        expect(wrapper.find("#button_confirm_delete").exists()).toBeTruthy();
    })
    it('should delete the member from the database', async () => {
        server.use(
            rest.delete('http://localhost:3000/api/member/1', (req, res, ctx) => {
                return res(ctx.status(200))
            }),
        )
    })
})