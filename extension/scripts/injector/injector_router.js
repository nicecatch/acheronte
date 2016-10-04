class Router {
    constructor(dockbar){
        this._dockbar = dockbar
        this.message_listeners = {}

        /*
         Messaggio dal background - Arriva una risposta
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
                        // Eseguo la funzione che spedisce all'elemento il messaggio proveniente dal background
                        listener.callback_from_background.call(listener.self, response)
                    })
                }
            }
        )
    }

    get_dockbar() {
        return this._dockbar
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
        chrome.runtime.sendMessage(object)
    }
}