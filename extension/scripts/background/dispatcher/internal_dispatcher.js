class InternalHandlerList {
    constructor() {
        this._managerDispatcherList = {
            'wifi': WifiHandler,
            'zoom_minus': ZoomMinusHandler,
            'zoom_plus': ZoomPlusHandler
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

    resolve_request(parameter) {
        this._dirty_config = true
        var handler = null
        if(this._internalHandlerList.get_handler(parameter.name))
        {
            handler = new (this._internalHandlerList.get_handler(parameter.name))()
            this._elements_registered[parameter.name] = handler

            var mlc = new MessageListenerCallbacks(
                parameter.name, // name

                handler,

                handler.callback_from_extension,
                handler.callback_from_native
            )
            this._router.add_listener(mlc)
        }
        else
        {
            // Elements that don't need to communicate with native host application
            handler = new BaseHandler(parameter.name, '')
            this._elements_registered[parameter.name] = handler
        }

        handler.set_position(parameter.position)
        if(parameter.extraParams)
        {
            handler.set_extra_params(parameter.extraParams)
        }

    }

    get_config() {
        if(this._dirty_config) {
            for(var element in this._elements_registered) {
                if(this._elements_registered.hasOwnProperty(element)) {
                    var elem_to_push = {
                        type: "0",
                        name: this._elements_registered[element].get_name(),
                        position: this._elements_registered[element].get_position()
                    }

                    if(this._elements_registered[element].get_extra_params()) {
                        elem_to_push.extraParams = this._elements_registered[element].get_extra_params()
                    }

                    this._config.push(elem_to_push)
                }
            }
            this._dirty_config = false
        }
        return this._config
    }
}