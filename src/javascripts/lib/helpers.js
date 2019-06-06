/**
 * Resize App container
 * @param {ZAFClient} client ZAFClient object
 * @param {Number} max max height available to resize to
 * @return {Promise} will resolved after resize
 */
export function resizeContainer (client, max = Number.POSITIVE_INFINITY) {
  const newHeight = Math.min(document.body.clientHeight, max)
  return client.invoke('resize', { height: newHeight })
}

/**
 * Helper to render a dataset using the same template function
 * @param {Array} set dataset
 * @param {Function} getTemplate function to generate template
 * @param {String} initialValue any template string prepended
 * @return {String} final template
 */
export function templatingLoop (set, getTemplate, initialValue = '') {
  return set.reduce((accumulator, item, index) => {
    return `${accumulator}${getTemplate(item, index)}`
  }, initialValue)
}

/**
 * Render template
 * @param {String} replacedNodeSelector selector of the node to be replaced
 * @param {String} htmlString new html string to be rendered
 */
export function render (replacedNodeSelector, htmlString) {
  const fragment = document.createRange().createContextualFragment(htmlString)
  const replacedNode = document.querySelector(replacedNodeSelector)

  replacedNode.parentNode.replaceChild(fragment, replacedNode)
}

/**
 * Attach event handler on node
 * @param {String} nodeSelector selector of the node
 * @param {String} eventName event name to be attached
 * @param {Function} handler the callback function to be called
 */
export function attachEvent (nodeSelector, eventName, handler) {
  const node = document.querySelector(nodeSelector)

  node.addEventListener(eventName, handler, false)
}

/**
 * Detach event handler on node
 * @param {String} nodeSelector selector of the node
 * @param {String} eventName event name to be detached
 * @param {Function} handler the callback function to be removed
 */
export function detachEvent (nodeSelector, eventName, handler) {
  const node = document.querySelector(nodeSelector)

  node.removeEventListener(eventName, handler, false)
}

/**
 * Helper to escape unsafe characters in HTML, including &, <, >, ", ', `, =
 * @param {String} str String to be escaped
 * @return {String} escaped string
 */
export function escapeSpecialChars (str) {
  if (typeof str !== 'string') throw new TypeError('escapeSpecialChars function expects input in type String')

  const escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  return str.replace(/[&<>"'`=]/g, function (m) { return escape[m] })
}
