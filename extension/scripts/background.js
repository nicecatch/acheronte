var nativeManager = new NativeManager('it.tdt.host_application')
var wifiManager = new WifiManager(nativeManager)
var touchManager = new TouchManager(nativeManager)

var callback_webRequest_failed = function (details_object) {
    setTimeout(function (){
        chrome.tabs.reload(details_object.tabId)
    }, 5000)
}
var filter_webRequest_failed = {
    "urls": ["*://*/*"],
    "types": ["main_frame"]
}
chrome.webRequest.onErrorOccurred.addListener(callback_webRequest_failed, filter_webRequest_failed)

var get_wifi_value = function(tabId) {
    wifiManager.send_message(tabId || 0)
}

setInterval(function(){
    get_wifi_value()
}, 5000)

var executables = {}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request){
            if(request.recipient == 'native'){
                if(request.button_pressed == 'touch') {
                    touchManager.send_message()
                }
            }
            if(request.recipient == 'add-wifi'){
                wifiManager.tab_to_signal.push(sender.tab.id)
                get_wifi_value(sender.tab.id)
            } 
        }
    }
)
