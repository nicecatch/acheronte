class WifiHandler extends BaseHandler {
    constructor() {
        super('wifi', 'powershell -File wifi.ps1')

        this.tab_to_signal = []
        this._wifi_signal_cached = -1
        var self = this

        chrome.tabs.onRemoved.addListener(function (tabId) {
            var index = self.tab_to_signal.indexOf(tabId)
            if(index >= 0) {
                self.tab_to_signal.splice(index, 1)
            }
        })

        setInterval(function() {
            self._ask_wifi()
        }, 5000)

        setInterval(function() {
            self._send_wifi()
        }, 5000)


    }

    _ask_wifi(){
        var msg = {
            type: "execute_command",
            tabId: '0',
            name: 'wifi',
            command: this.get_command()
        }

        router.send_message(msg)
    }

    _send_wifi(tabId) {

        var wifi = {
            name: "wifi",
            signal: this._wifi_signal_cached
        }

        if(tabId) {
            // signal single page
            chrome.tabs.sendMessage(tabId, wifi);
        }
        else {
            // signal registered tabs
            this.tab_to_signal.forEach(function(tabid) {
                chrome.tabs.sendMessage(tabid, wifi);
            })
        }

    }

    callback_from_extension(params) {
        // page wants to be added to signal_list
        var tabId = params.sender.tab.id
        var index = this.tab_to_signal.indexOf(tabId)
        if(index < 0) {
            this.tab_to_signal.push(tabId)
        }
        this._send_wifi(tabId)
    }

    callback_from_native(params) {
        this._wifi_signal_cached = params.response || -1

        this._send_wifi()
    }
}