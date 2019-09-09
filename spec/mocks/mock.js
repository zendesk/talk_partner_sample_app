let callbacks = {}

export const CLIENT = {
  _origin: 'zendesk.com',
  get: (prop) => {
    if (prop === 'currentUser') {
      return Promise.resolve({
        currentUser: {
          locale: 'en',
          name: 'Sample User'
        }
      })
    }
    return Promise.resolve({
      [prop]: null
    })
  },
  on: (e, cb) => {
    callbacks[e] = callbacks[e] || []
    callbacks[e].push(cb)
  },
  trigger: (e, p) => {
    callbacks[e] = callbacks[e] || []
    callbacks[e].forEach(cb => cb(p))
  }
}
