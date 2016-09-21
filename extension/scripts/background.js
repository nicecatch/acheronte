// Trace tabs opened and that need to be signaled with WiFi properties
// It doesn't automatically add tabs to this array, but injected page will send a messsage
// containing tabId to add
var tab_to_signal = []

// Try to remove a tab when it is closed from the list to tab to signal
chrome.tabs.onRemoved.addListener(function (tabId) {
    var index = tab_to_signal.indexOf(tabId)
    if(index >= 0) {
        tab_to_signal.splice(index, 1)
    }
});

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
      if(sender.tab) {
          tab_to_signal.push(sender.tab.id)
      }
  });


var callback_webRequest = function (details_object) {
    setTimeout(function (){
        chrome.tabs.reload(details_object.tabId)
    }, 5000)
}

var filter_webRequest = {
    "urls": ["*://*/*"],
    "types": ["main_frame"]
}
      
chrome.webRequest.onErrorOccurred.addListener(callback_webRequest, filter_webRequest)

var callback_networks = function (networks) {
    // networks is an array - get first
    wifi_network = networks[0]
}

var filter_networks = {
    "networkType": "WiFi"
}
/*
var wifi_network = null;

function getWifiNetwork() {
    if(!wifi_network && chrome.networkingPrivate) {
        chrome.networkingPrivate.getNetworks(filter_networks, callback_networks)
    }
    return wifi_network
}

function sendWifiStrength() {
    if(getWifiNetwork() && tab_to_signal.length) {
        chrome.networkingPrivate.getState(getWifiNetwork().GUID, function(result) {
            for(tabId in tab_to_signal) {
                chrome.tabs.sendMessage(tabId, result, function(response){})
            }
        })
    }
}

// Every 5 seconds it retrieves wifi properties and notifies it to injector
setTimeout(function() {
    sendWifiStrength()
}, 5000)

sendWifiStrength()
*/