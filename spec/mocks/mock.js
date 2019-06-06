let callbacks = []

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
    callbacks.push(cb)
  },
  trigger: (p) => {
    callbacks.forEach(cb => cb(p))
  }
}

export const ORGANIZATIONS = {
  organizations: [
    { name: 'Organization A' },
    { name: 'Organization B' }
  ],
  next_page: null,
  previous_page: null,
  count: 1
}
