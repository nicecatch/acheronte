class Router {
    constructor(host_application){
        this.host_application = host_application
        this.message_listeners = {}

        /*
         Messaggio dall'estensione - È stato fatto click su un pulsante
        */

        var self = this
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(request && request.name && self.message_listeners[request.name]) {
                    var response = {
                        request: request,
                        sender: sender,
                        sendResponse: sendResponse
                    }
                    self.message_listeners[request.name].forEach(function(listener){
                        // Eseguo la funzione che manda all'applicazione host un messaggio
                        listener.callback_from_extension.call(listener.self, response)
                    })
                }
            }
        )
    }

    _get_port() {
        var self = this;
        return new Promise(
            function(resolve, reject) {
                if(!self._port) {
                    self._port = chrome.runtime.connectNative(self.host_application);

                    self._port.onMessage.addListener(function(message) {
                        /*
                            Messaggio dalla host application 
                            Sta inviando dei dati indietro all'estensione
                        */
                        if(!message)
                            return;
                        self._alert(message)
                    });
                }
                resolve(self._port)
            }
        );
    }

    _alert(message) {
        if(this.message_listeners[message.name]){
            this.message_listeners[message.name].forEach(function(listener){
                // Inoltro il messaggio al(/ai) chiamante(/i)
                if(listener)
                    listener.callback_from_native.call(listener.self, message)
            })
        }
    }

    add_listener(mlcs) {
        if(!mlcs || !mlcs.name || mlcs.name == "") {
            return; // fail silently?
        }
        if(!this.message_listeners[mlcs.name]) {
            this.message_listeners[mlcs.name] = []
        }
        this.message_listeners[mlcs.name].push(mlcs)
    }

    send_message(object) {
        this._get_port().then(
            function(port) {
                port.postMessage(object)
            }
        )
    }
}