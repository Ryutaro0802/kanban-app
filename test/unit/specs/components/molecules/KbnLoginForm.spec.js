import { mount } from '@vue/test-utils'
import KbnLoginForm from '@components/molecules/KbnLoginForm.vue'

describe('KbnLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })
      describe('email', () => {
        describe('required', () => {
          describe('何も入力されない', () => {
            it('validation.email.requiredがinvalidであること', () => {
              loginForm.setData({ email: '' })
            })
          })
          describe('入力あり', () => {
            it('validation.email.requiredがvalidであること', () => {
              loginForm.setData({email: 'foo@domain.com'})
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
        })
      })
      describe('format', () => {
        describe('メールアドレス形式でないフォーマット', () => {
          it('validation.email.formatがinvalidであること', () => {
            loginForm.setData({email: 'foobar'})
            expect(loginForm.vm.validation.email.format).to.equal(false)
          })
        })
        describe('メールアドレス形式のフォーマット', () => {
          it('validation.emai.requiredがvalidであること', () => {
            loginForm.setData({email: 'foo@domain.com'})
            expect(loginForm.vm.validation.email.format).to.equal(true)
          })
        })
      })
      describe('password', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.password.requiredがinvalidであること', () => {
              loginForm.setData({password: ''})
              expect(loginForm.vm.validation.required).to.equal(false)
            })
          })
          describe('入力あり', () => {
            it('validation.password.requiredがvalidであること', () => {
              loginForm.setData({password: 'xxxx'})
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })
    })
  })
})
