class MessageListenerCallbacks {
    constructor(name, callback_from_extension, callback_from_native){
        this.name = name;
        this.callback_from_extension = callback_from_extension;
        this.callback_from_native = callback_from_native;
    }
}

class Router {
    constructor(host_application){
        this.host_application = host_application
        this.message_listeners = {}

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(request && this.message_listeners[request.name]) {
                    var response = {
                        request: request,
                        sender: sender,
                        sendResponse: sendResponse
                    }
                    // SEND SOMETHING
                }
                // if(request){
                //     if(request.recipient == 'native'){
                //         if(request.button_pressed == 'touch') {
                //             touchManager.send_message()
                //         }
                //     }
                //     if(request.recipient == 'add-wifi'){
                //         wifiManager.tab_to_signal.push(sender.tab.id)
                //         get_wifi_value(sender.tab.id)
                //     } 
                // }
            }
        )

    }

    _get_port(){
        var self = this;
        return new Promise(
            function(resolve, reject) {
                if(!self._port) {
                    self._port = chrome.runtime.connectNative(self.host_application);

                    self._port.onMessage.addListener(function(message) {
                        if(!message || !message.requestType)
                            return;
                        self._alert(message)
                    });
                }
                resolve(self._port)
            }
        );
    }

    _alert(message) {
        if(this.message_listeners[message.requestType]){
            this.message_listeners[message.requestType].forEach(function(listener, index, array){
                if(listener)
                    listener.manage_callback(message)
            })
        }
    }

    add_listener(requestType, caller) {
        if(!requestType || requestType == "") {
            return; // fail silently?
        }
        if(!this.message_listeners[requestType]) {
            this.message_listeners[requestType] = []
        }
        this.message_listeners[requestType].push(caller)
    }

    send_message(object) {
        this._get_port().then(
            function(port) {
                port.postMessage(object)
            }
        )
    }
}