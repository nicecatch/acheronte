var router = new Router('it.tdt.host_application')

var configManager = new ConfigManager(router)
configManager.send_message(0) // no tab

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
