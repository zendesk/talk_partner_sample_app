export default function (args) {
  return `<div class="talk-partner-app">
    <div>
      <span>Call requested: ${args.dialout.number}</span>
    </div>
    <div class="pull-down">
      <button class="c-btn" id="back">&lt; Back</button>
    </div>
  </div>`
}
