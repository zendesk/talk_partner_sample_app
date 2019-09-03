import { escapeSpecialChars as escape } from '../javascripts/lib/helpers.js'

export default function (args) {
  return `<div class="talk-partner-app">
    <div>
      <h1>Hi ${escape(args.currentUserName)}, this is a sample app</h1>
    </div>
  </div>`
}
