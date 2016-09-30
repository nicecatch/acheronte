class InternalMakerList {
    constructor(router) {
        this._managerDispatcherList = {
            'wifi': WifiMaker,
            'reload': ReloadMaker,
            'battery': BatteryMaker
        }
    }

    get_handler(num) {
        if(!num)
            return this._managerDispatcherList
        return this._managerDispatcherList[num]
    }
}


class InternalDispatcher extends BaseDispatcher {
    constructor(router, document) {
        super(router, document)
        
        this._internalMakerList = new InternalMakerList()
        this._elements_registered = {}
        this._config = []
        this._dirty_config = true
    }

    resolve_request(parameter) {
        this._dirty_config = true
        if(this._internalMakerList.get_handler(parameter.response.name))
        {
            // salvo l'intero elemento inviato dalla host application
            var makerElement = new this._internalMakerList.get_handler(parameter.response.name)()
            this.router.add_element(makerElement.create(this._document))
            this._elements_registered[parameter.response.name] = makerElement

            var mlc = MessageListenerCallbacks(
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
                        chrome.runtime.sendMessage(response.tabId, msg);
                    }
                }
            )
            this._router.add_listener(mlc)
        }
    }
}