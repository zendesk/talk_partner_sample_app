/**
 *  Talk Partner Sample App
 **/

import I18n from '../../javascripts/lib/i18n'
import { render, attachEvent, detachEvent } from '../../javascripts/lib/helpers'
import getDefaultTemplate from '../../templates/default'
import getCallTemplate from '../../templates/call'
import getErrorTemplate from '../../templates/error_screen'

class App {
  constructor (client, appData) {
    this._client = client
    this._appData = appData

    this.states = {}

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {
    const currentUser = (await this._client.get('currentUser')).currentUser
    this.states.currentUserName = currentUser.name

    I18n.loadTranslations(currentUser.locale)

    render('.talk-partner-app', getDefaultTemplate(this.states))

    this._client.on('voice.dialout', this._handleDialout.bind(this))
    this._client.on('voice.error', this._handleError.bind(this))

    return this._client.invoke('resize', { height: '400px' })
  }

  _handleBack () {
    detachEvent('#back', 'click', this._handleBack.bind(this))
    this.states.dialout = null
    render('.talk-partner-app', getDefaultTemplate(this.states))
  }

  _handleDialout (data) {
    this.states.dialout = data
    render('.talk-partner-app', getCallTemplate(this.states))
    attachEvent('#back', 'click', this._handleBack.bind(this))
    this._client.invoke('popover', 'show')
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError (error) {
    this.states.error = error
    render('.talk-partner-app', getErrorTemplate(this.states))
    attachEvent('#back', 'click', this._handleBack.bind(this))
    this._client.invoke('popover', 'show')
  }
}

export default App
