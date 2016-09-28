class BaseHandler {
    constructor(name, alert_background) {
        this._name = name
        this._alert_background = alert_background
    }
    
    _get_name() {
        return this._name
    }

    button_clicked() {
        var notification = {
            name: this._get_name()
        }
        if(this._internal_button_clicked)
            this._internal_button_clicked
        if(_alert_background) {
            chrome.runtime.sendMessage(notification, function(response) {
                // do nothing
            })
        }
    }

}