export default function (args) {
  return `<div class="talk-partner-app">
    <div>
      <p>Call requested</p>
      <p>Number: ${args.dialout.number}</p>
      <p>User ID: ${args.dialout.userId}</p>
      <p>Ticket ID: ${args.dialout.ticketId}</p>
    </div>
    <div class="pull-down">
      <button class="c-btn" id="back">&lt; Back</button>
    </div>
  </div>`
}
