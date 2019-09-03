export default function (args) {
  return `<div class="talk-partner-app">
    <div>
      <p>Error</p>
      <p>Code: ${args.error.code}</p>
    </div>
    <div class="pull-down">
      <button class="c-btn" id="back">&lt; Back</button>
    </div>
  </div>`
}
