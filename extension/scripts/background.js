// Port to send and receive message with host_application.exe
//var panasonic_port = chrome.runtime.connectNative('it.tdt.host_application')

// panasonic_port.onMessage.addListener(function(msg) {
//     chrome.tabs.sendMessage(msg.tabId, msg.text)
// });


var callback_webRequest_failed = function (details_object) {
    setTimeout(function (){
        chrome.tabs.reload(details_object.tabId)
    }, 5000)
}

var filter_webRequest = {
    "urls": ["*://*/*"],
    "types": ["main_frame"]
}
      
chrome.webRequest.onErrorOccurred.addListener(callback_webRequest_failed, filter_webRequest)

var executables = {}

executables['panasonic'] = "C:\\Program Files\\Panasonic\\PDboard\\PDboard.exe";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request){
            if(request.recipient == 'native'){
                var message_to_native = {
                    tabId: sender.tab.id,
                    text: executables[request.button_pressed]
                }
                chrome.runtime.sendNativeMessage('it.tdt.host_application', message_to_native, function(response){
                    //chrome.tabs.sendMessage(response.tabId, response.text)
                })
                //panasonic_port.postMessage(message_to_native)
            }
        }
    }
)
