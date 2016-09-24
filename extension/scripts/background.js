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

var callback_webRequest_failed = function (details_object) {
    setTimeout(function (){
        chrome.tabs.reload(details_object.tabId)
    }, 5000)
}

var filter_webRequest = {
    "urls": ["*://*/*"],
    "types": ["main_frame"]
}

var advise_all = function(response) {
    tab_to_signal.forEach(function(tabId, index, array){
        send_wifi_value(response, tabId)
    })
}

var get_wifi_value = function(callback) {
    var message_to_native = {
        tabId: 0,
        text: executables['wifi']
    }
    var args_slices = [...arguments].slice(1)
    chrome.runtime.sendNativeMessage('it.tdt.host_application', message_to_native, function(response){
        callback(response, ...args_slices)
    })        

}

var send_wifi_value = function(response, tabId) {
    var wifi = {
        type: "wifi",
        signal: response && response.response ? response.response : -1
    }
    chrome.tabs.sendMessage(tabId, wifi);
}

setInterval(function(){
    get_wifi_value(advise_all);

}, 5000)
      
chrome.webRequest.onErrorOccurred.addListener(callback_webRequest_failed, filter_webRequest)

var executables = {}

//executables['panasonic'] = "C:\\\"Program Files\"\\Panasonic\\PDboard\\PDboard.exe";
executables['panasonic'] = "C:\\Windows\\System32\\notepad.exe"
executables['wifi'] = "PowerShell.exe -File wifi.ps1"

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request){
            if(request.recipient == 'native'){
                var message_to_native = {
                    tabId: sender.tab.id,
                    text: executables[request.button_pressed]
                }
                chrome.runtime.sendNativeMessage('it.tdt.host_application', message_to_native, function(response){
                    chrome.tabs.sendMessage(sender.tab.id, response)                    
                })
            }
            if(request.recipient == 'add-wifi'){
                tab_to_signal.push(sender.tab.id)
                get_wifi_value(send_wifi_value, sender.tab.id)
            } 
        }
    }
)
