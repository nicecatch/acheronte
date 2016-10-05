class ExternalDispatcher extends BaseDispatcher {
    constructor(router) {
        super(router)

        this._elements_registered = {}
        this._config = []
        this._dirty_config = true
    }
    
    resolve_request(parameter) {
        this._dirty_config = true
        this._elements_registered[parameter.name] = parameter // salvo l'intero elemento inviato dalla host application
        
        var mlc = new MessageListenerCallbacks(
            parameter.name, // name

            this,

            function(response) { // from extension
                var msg = {
                    type: "execute_command",
                    tabId: response.sender.tab.id,
                    name: parameter.name,
                    command: parameter.value,
                }
                this._router.send_message(msg)
            }, 

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

    get_config() {
        if(this._dirty_config) {
            for(var element in this._elements_registered) {
                if(this._elements_registered.hasOwnProperty(element)) {
                    this._config.push({
                        // All'estensione interessa unicamente il nome del bottone 
                        // e il nome dell'icona corrispondente per le font awesome
                        type: "1",
                        name: this._elements_registered[element].name,
                        icon: this._elements_registered[element].icon,
                        position: this._elements_registered[element].position
                    })
                }
            }
            this._dirty_config = false
        }
        return this._config
    }
}