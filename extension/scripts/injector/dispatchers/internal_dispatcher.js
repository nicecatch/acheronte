class InternalMakerList {
    constructor(router) {
        this._managerDispatcherList = {
            'battery': BatteryMaker,
            'collapse': CollapseMaker,
            'hostname': HostnameMaker,
            'link': LinkMaker,
            'reload': ReloadMaker,
            'wifi': WifiMaker,
            'zoom_minus': ZoomMinusMaker,
            'zoom_plus': ZoomPlusMaker
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
    }

    resolve_request(parameter) {
        if(this._internalMakerList.get_handler(parameter.name))
        {
            // salvo l'intero elemento inviato dalla host application
            var elementMaker = new (this._internalMakerList.get_handler(parameter.name))()
            this._router.get_dockbar().add_element(elementMaker.create(parameter))
            this._elements_registered[parameter.name] = elementMaker

            var mlc = new MessageListenerCallbacks(
                parameter.name, // name

                this,
                function (response) {
                    elementMaker.handle_response(response)
                }

            )
            this._router.add_listener(mlc)
        }
    }
}