
class ConfigManager extends BaseManager {
    constructor(router) {
        super(router)
        this._dispatcherList = DispatcherList(router) 
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