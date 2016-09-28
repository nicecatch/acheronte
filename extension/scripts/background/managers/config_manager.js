class DispatcherList {
    constructor(router) {
        this._managerDispatcherList = {
            0: InternalDispatcher(router),
            1: NativeDispatcher(router)
        }
    }

    getDispatcher(num) {
        return this._managerDispatcherList[num];
    }
}

class ConfigManager extends BaseManager {
    constructor(router) {
        super(router)
        this._dispatcherList = DispatcherList(router) 
    }
    
    manage_callback(parameters) {
        // dentro parameters.response ho la lista di oggeti che configurano la dockbar
        if(parameters && parameters.response) {
            for(elem in parameters) {
                _dispatcherList.getDispatcher(elem.response.type).resolve(elem)
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