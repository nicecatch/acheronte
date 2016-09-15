var callback = function (details_object) {
    //if (details.frameId === 0) {
    setTimeout(function (){
        chrome.tabs.reload(null);
    }, 5000)
}
var filter = {
    "urls": ["*://*/*"],
    "types": ["main_frame"]
};
      
chrome.webRequest.onErrorOccurred.addListener(callback, filter);