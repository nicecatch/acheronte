class DispatcherList {
    constructor(router) {
        this._managerDispatcherList = {
            0: InternalDispatcher(router),
            1: ExternalDispatcher(router)
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
        this._dispatcherList = DispatcherList(router) 
    }
    
    // Una pagina sta richiedendo la configurazione
    callback_from_extension(parameters) {
        var result = []
        for(property in this._dispatcherList.getDispatcher()) {

            if(this._managerDispatcherList.hasOwnProperty(property)) {
                result.push(...property.get_config())
            }
        }
        return result;
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

    static getRequestType() {
        return 'get_config'
    }

    static getText () {
        // not important for config manager
        return ''
    }
}