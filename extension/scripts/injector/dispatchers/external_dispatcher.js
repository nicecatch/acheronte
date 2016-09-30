class ExternalDispatcher extends BaseDispatcher {
    constructor(router, document) {
        super(router, document)

        this._elements_registered = {}
        this._config = []
        this._dirty_config = true
    }
    
    resolve_request(parameter) {
        this._dirty_config = true
        this._elements_registered[parameter.response.name] = parameter // salvo l'intero elemento inviato dalla host application
        
        var mlc = new MessageListenerCallbacks(
            parameter.response.name, // name

            this,

            function (response) { // from native
                if(response) {
                    var msg = {
                        type: response.type,
                        tabId: response.tabId,
                        name: response.name,
                        response: response.response
                    }
                    chrome.tabs.sendMessage(msg.tabId, msg);  
                }
            }
        )
        this._router.add_listener(mlc)
    }
}