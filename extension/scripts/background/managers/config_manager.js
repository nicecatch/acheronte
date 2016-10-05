class DispatcherList {
    constructor(router) {
        this._managerDispatcherList = {
            0: new InternalDispatcher(router),
            1: new ExternalDispatcher(router)
        }
    }

    getDispatcher(num) {
        if(!num)
            return this._managerDispatcherList
        return this._managerDispatcherList[num];
    }
}

class ConfigManager extends BaseManager {
    constructor(router) {
        super(router)
        this._dispatcherList = new DispatcherList(router)
    }
    
    // Una pagina sta richiedendo la configurazione
    callback_from_extension(parameters) {
        var result = []
        for(var property in this._dispatcherList.getDispatcher()) {

            if(this._dispatcherList.getDispatcher().hasOwnProperty(property)) {
                result.push(...(this._dispatcherList.getDispatcher(property).get_config()))
            }
        }

        var request = {
            name: 'get_config',
            response: result
        }
        chrome.tabs.sendMessage(parameters.sender.tab.id, request);
        //return result;
    }

    // La host application mi sta inviando la configurazione
    callback_from_native(parameters) {
        // dentro parameters.response ho la lista di oggetti che configurano la dockbar
        if(parameters && parameters.response) {
            var self = this;
            parameters.response.forEach(function(elem) {
                self._dispatcherList.getDispatcher(elem.type).resolve(elem)
            })
        }
    }

    send_message(tab){
        var msg = {
            tabId: tab,
            type: 'get_config',
            name: 'get_config'
        }
        this.router.send_message(msg)
    }

    static getRequestType() {
        return 'get_config'
    }

    static getText () {
        // not important for config manager
        return ''
    }
}