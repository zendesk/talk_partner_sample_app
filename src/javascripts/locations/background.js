/* global ZAFClient */
const client = ZAFClient.init()

client.get('instances').then(function (instancesData) {
  const instances = instancesData.instances
  for (const instanceGuid in instancesData.instances) {
    if (instances[instanceGuid].location === 'top_bar') {
      client.instance(instanceGuid).invoke('preloadPane')
    }
  }
})
