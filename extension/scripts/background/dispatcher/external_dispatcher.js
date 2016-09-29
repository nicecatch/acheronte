class ExternalDispatcher extends BaseDispatcher {
    constructor(router) {
        super(router)

        this._elements_registered = {}
        this._config = []
        this._dirty_config = true
    }
    
    check_validity(parameter) {
        return parameter && parameter.response && parameter.response.name && parameter.response.value && parameter.response.icon

    }
    
    resolve_request(parameter) {
        this._dirty_config = true
        this._elements_registered[parameter.response.name] = parameter // salvo l'intero elemento inviato dalla host application
        
        var mlc = MessageListenerCallbacks(
            parameter.response.name, // name

            this,

            function(response) { // from extension
                var msg = {
                    type: "execute_command",
                    tabId: response.tab.id,
                    requestType: parameter.response.name,
                    text: parameter.response.value,
                }
                this.router.send_message(msg)
            }, 

            function (response) { // from native
                if(response) {
                    var msg = {
                        type: response.type,
                        tabId: response.tabId,
                        requestType: response.requestType,
                        response: response.response
                    }
                    chrome.tabs.sendMessage(response.tabId, msg);  
                }
            }
        )
        this._router.add_listener(mlc)
    }

    get_config() {
        if(this._dirty_config) {
            for(element in this._elements_registered) {
                if(this._elements_registered.hasOwnProperty(element)) {
                    this._config.push({
                        // All'estensione interessa unicamente il nome del bottone 
                        // e il nome dell'icona corrispondente per le font awesome
                        requestType: element.response.name,
                        icon: element.response.icon
                    })
                }
            }
            this._dirty_config = false
        }
        return this._config
    }
}