class BaseManager{
    constructor(manager){
        this.manager = manager
        manager.add_listener(this.constructor.getRequestType(), this)
    }
    static _get_request(tab){
        var rqst = {
            tabId: tab,
            requestType: this.getRequestType(),
            text: this.getText()
        }
        return rqst;
    }

    send_message(opt){
        this.manager.send_message(this.constructor.get_request(opt))
    }

    static getRequestType() {
        // override this
    }

    static getText () {
        // override this
    }
}

class WifiManager extends BaseManager {
    constructor(manager) {
        super(manager)
        this.tab_to_signal = []
        var self = this

        chrome.tabs.onRemoved.addListener(function (tabId) {
            var index = self.tab_to_signal.indexOf(tabId)
            if(index >= 0) {
                self.tab_to_signal.splice(index, 1)
            }
        });

    }

    manage_callback(response) {
        var wifi = {
            type: "wifi",
            signal: response && response.response ? response.response : -1
        }
        if(response.tabId != 0){
            chrome.tabs.sendMessage(response.tabId, wifi);   
        }
        else {
            this.tab_to_signal.forEach(function(tabid) {
                chrome.tabs.sendMessage(tabid, wifi);   
            })
        }

    }

    static getRequestType() {
        return 'wifi'
    }

    static getText () {
        return "PowerShell.exe -File wifi.ps1"
    }

    static get_request(tab) {
        return super._get_request(tab || 0)
    }
}

class TouchManager extends BaseManager {

    manage_callback(response) {
        // do nothing
    }
    static getRequestType() {
        return 'touch'
    }

    static getText () {
        // return "C:\\\"Program Files\"\\Panasonic\\PDboard\\PDboard.exe"
        return "C:\\Windows\\System32\\notepad.exe"
    }
    static get_request() {
        return super._get_request(0)
    }
}