/* eslint-env jest, browser */
import App from '../src/javascripts/modules/app'
import { CLIENT } from './mocks/mock'
import createRangePolyfill from './polyfills/createRange'

jest.mock('../src/javascripts/lib/i18n', () => {
  return {
    loadTranslations: jest.fn(),
    t: key => key
  }
})

if (!document.createRange) {
  createRangePolyfill()
}

describe('Talk Partner Sample App', () => {
  let app

  describe('Initialization Success', () => {
    beforeEach((done) => {
      document.body.innerHTML = '<section data-main><img class="talk-partner-app loader" src="spinner.gif"/></section>'
      CLIENT.invoke = jest.fn().mockReturnValue(Promise.resolve({}))

      app = new App(CLIENT, {})

      app.initializePromise.then(() => {
        done()
      })
    })

    it('should render main stage with data', () => {
      expect(document.querySelector('.talk-partner-app')).not.toBe(null)
      expect(document.querySelector('h1').textContent).toBe('Hi Sample User, this is a sample app')
    })

    describe('when receiving an error', () => {
      beforeEach(() => {
        CLIENT.trigger('voice.error', {
          code: 'unknown'
        })
      })

      it('should display error', () => {
        expect(document.querySelector('div p:nth-child(1)').textContent.trim()).toBe('Error')
        expect(document.querySelector('div p:nth-child(2)').textContent.trim()).toBe('Code: unknown')
      })

      it('should be able to go back', () => {
        expect(document.querySelector('#back')).not.toBe(null)
        document.querySelector('#back').dispatchEvent(new Event('click'))
        expect(document.querySelector('.talk-partner-app')).not.toBe(null)
        expect(document.querySelector('h1').textContent).toBe('Hi Sample User, this is a sample app')
      })
    })

    describe('when making a call', () => {
      beforeEach(() => {
        CLIENT.trigger('voice.dialout', {
          number: '+123',
          userId: 1,
          ticketId: 2
        })
      })

      it('should display call', () => {
        expect(document.querySelector('div p:nth-child(1)').textContent.trim()).toBe('Call requested')
        expect(document.querySelector('div p:nth-child(2)').textContent.trim()).toBe('Number: +123')
        expect(document.querySelector('div p:nth-child(3)').textContent.trim()).toBe('User ID: 1')
        expect(document.querySelector('div p:nth-child(4)').textContent.trim()).toBe('Ticket ID: 2')
      })

      it('should be able to go back', () => {
        expect(document.querySelector('#back')).not.toBe(null)
        document.querySelector('#back').dispatchEvent(new Event('click'))
        expect(document.querySelector('.talk-partner-app')).not.toBe(null)
        expect(document.querySelector('h1').textContent).toBe('Hi Sample User, this is a sample app')
      })
    })
  })
})
