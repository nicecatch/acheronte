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
    constructor(router, dockbar) {
        super(router)
        this._dockbar = dockbar
        this._dispatcherList = new DispatcherList(router)
    }
    
    // La host application mi sta inviando la configurazione
    callback_from_native(parameters) {
        // dentro parameters.response ho la lista di oggetti che configurano la dockbar
        if(parameters && parameters.response) {
            for(elem in parameters) {
                this._dispatcherList.getDispatcher(elem.response.type).resolve(elem)
            }
        }
    }

    ask_config() {
        this._router.send_message({
            name: this.constructor.getRequestType()
        })
    }

    static getRequestType() {
        return 'get_config'
    }

    static getText() {
        // not important for config manager
        return ''
    }

}