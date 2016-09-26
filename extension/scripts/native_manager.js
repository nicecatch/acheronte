class NativeManager {
    constructor(host_application){
        this.host_application = host_application
        this.message_listeners = {}
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