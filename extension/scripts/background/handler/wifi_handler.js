class WifiHandler extends BaseHandler {
    constructor() {
        super('wifi', 'powershell -File wifi.ps1')
        
        // var get_wifi_value = function(tabId) {
        //     wifiManager.send_message(tabId || 0)
        // }

        // setInterval(function(){
        //     get_wifi_value()
        // }, 5000)

    }
}