class InternalHandlerList {
    constructor(router) {
        this._managerDispatcherList = {
            'wifi': WifiHandler,
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
        if(this._internalHandlerList.get_handler(parameter.name))
        {
            var handler = new (this._internalHandlerList.get_handler(parameter.name))()
            this._elements_registered[parameter.name] = handler

/*            var callback_from_extension = null

            // Aggiungo la risposta solo se il bottone ha necessità di inviare un comando alla host application
            if(this._elements_registered[parameter.name] && this._elements_registered[parameter.name].get_command() != '')
            {
                callback_from_extension = function(response) {
                    var msg = {
                        type: "execute_command",
                        tabId: response.tab.id,
                        name: parameter.name,
                        command: this._elements_registered[parameter.name].get_command(),
                    }
                    this.router.send_message(msg)
                }
            }*/

            var mlc = new MessageListenerCallbacks(
                parameter.name, // name

                handler,

                handler.callback_from_extension,
                handler.callback_from_native

/*                function (response) { // from native
                    if(response) {
                        var msg = {
                            type: response.type,
                            tabId: response.tabId,
                            name: response.name,
                            response: response.response
                        }
                        chrome.tabs.sendMessage(response.tabId, msg);  
                    }
                }*/
            )
            this._router.add_listener(mlc)
        }
        else
        {
            // Elements that don't need to communicate with native host application
            var baseHandler = new BaseHandler(parameter.name, '')
            if(parameter.extraParams)
            {
                baseHandler.set_params(parameter.extraParams)
            }
            this._elements_registered[parameter.name] = baseHandler
        }
    }

    get_config() {
        if(this._dirty_config) {
            for(var element in this._elements_registered) {
                if(this._elements_registered.hasOwnProperty(element)) {
                    var elem_to_push = {
                        // All'estensione interessa unicamente il nome del bottone
                        type: "0",
                        name: this._elements_registered[element].get_name()
                    }

                    if(this._elements_registered[element].get_params()) {
                        elem_to_push.extraParams = this._elements_registered[element].get_params()
                    }

                    this._config.push(elem_to_push)
                }
            }
            this._dirty_config = false
        }
        return this._config
    }
}