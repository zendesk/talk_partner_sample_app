/* global ZAFClient */
var client = ZAFClient.init()

client.get('instances').then(function (instancesData) {
  var instances = instancesData.instances
  for (var instanceGuid in instancesData.instances) {
    if (instances[instanceGuid].location === 'top_bar') {
      client.instance(instanceGuid).invoke('preloadPane')
    }
  }
})
