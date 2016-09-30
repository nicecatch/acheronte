class InternalHandlerList {
    constructor(router) {
        this._managerDispatcherList = {
            'wifi': WifiHandler,
            'reload': ReloadHandler,
            'battery': BatteryHandler
        }
    }

    get_handler(num) {
        if(!num)
            return this._managerDispatcherList
        return this._managerDispatcherList[num]
    }
}


class InternalDispatcher extends BaseDispatcher {
    constructor(router) {
        super(router)
        
        this._internalHandlerList = new InternalHandlerList()
        this._elements_registered = {}
        this._config = []
        this._dirty_config = true
    }

    check_validity(parameter) {
        return parameter && parameter.response && parameter.response.name
    }

    resolve_request(parameter) {
        this._dirty_config = true
        if(this._internalHandlerList.get_handler(parameter.response.name))
        {
            // salvo l'intero elemento inviato dalla host application
            this._elements_registered[parameter.response.name] = new this._internalHandlerList.get_handler(parameter.response.name)()

            var callback_from_extension = null

            // Aggiungo la risposta solo se il bottone ha necessità di inviare un comando alla host application
            if(this._elements_registered[parameter.response.name] && this._elements_registered[parameter.response.name].get_command() != '')
            {
                callback_from_extension = function(response) {
                    var msg = {
                        type: "execute_command",
                        tabId: response.tab.id,
                        name: parameter.response.name,
                        command: this._elements_registered[parameter.response.name].get_command(),
                    }
                    this.router.send_message(msg)
                }
            }

            var mlc = new MessageListenerCallbacks(
                parameter.response.name, // name

                this,

                callback_from_extension, 

                function (response) { // from native
                    if(response) {
                        var msg = {
                            type: response.type,
                            tabId: response.tabId,
                            name: response.name,
                            response: response.response
                        }
                        chrome.tabs.sendMessage(response.tabId, msg);  
                    }
                }
            )
            this._router.add_listener(mlc)
        }
    }

    get_config() {
        if(this._dirty_config) {
            for(element in this._elements_registered) {
                if(this._elements_registered.hasOwnProperty(element)) {
                    this._config.push({
                        // All'estensione interessa unicamente il nome del bottone
                        name: element.response.name
                    })
                }
            }
            this._dirty_config = false
        }
        return this._config
    }
}