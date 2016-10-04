class ExternalDispatcher extends BaseDispatcher {
    constructor(router, document) {
        super(router, document)

        this._elements_registered = {}
        this._config = []
    }
    
    resolve_request(parameter) {
        this._elements_registered[parameter.name] = parameter // salvo l'intero elemento inviato dalla host application

        var makerElement = new GenericMaker(this._document, parameter.name)
        this._router.get_dockbar().add_element(makerElement.draw_element())
        this._elements_registered[parameter.name] = makerElement

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