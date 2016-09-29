class Router {
    constructor(){
        this.message_listeners = {}

        /*
         Messaggio dal background - Arriva una risposta
        */
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if(request && request.name && this.message_listeners[request.name]) {
                    var response = {
                        request: request,
                        sender: sender,
                        sendResponse: sendResponse
                    }
                    this.message_listeners[request.name].forEach(function(listener, index, array){
                        // Eseguo la funzione che all'elemento il messaggio proveniente dalla host application o dal background
                        listner.callback_from_extension.call(listner.self, response)
                    })
                }
            }
        )
    }

    _alert(message) {
        if(this.message_listeners[message.requestType]){
            this.message_listeners[message.requestType].forEach(function(listener, index, array){
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
        chrome.runtime.sendMessage(object)
    }
}