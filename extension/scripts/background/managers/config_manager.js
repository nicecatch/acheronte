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
        if(parameters) {

            if (parameters.buttons) {
                // dentro parameters.buttons ho la lista di oggetti che configurano la dockbar
                var self = this;
                parameters.buttons.forEach(function (elem) {
                    self._dispatcherList.getDispatcher(elem.type).resolve(elem)
                })
            }

            if (parameters.hostname) {
                // Salvo l'hostname
                this._hostname = parameters.hostname
            }

            if (parameters.whitelist) {
                this._whitelist = parameters.whitelist
                this.activate_whitelist()
            }
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

    get_hostname()
    {
        return this._hostname
    }

    activate_whitelist()
    {
        if(this._whitelist.length > 0) {
            let self = this
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

                // Look for the current opened URL within whitelist

                let found = self._whitelist.some(function(element){
                    return tab.url.indexOf(element) >= 0
                })

                if(!found) {
                    // check if tab still exists
                    chrome.tabs.get(tabId, function (verifiedTab) {
                        if (chrome.runtime.lastError) {
                            let errorMessage = chrome.runtime.lastError.message
                            // check the lastError message so Chrome won't write to console
                        } else if(verifiedTab) {
                            chrome.tabs.remove(verifiedTab.id)
                        }
                    })
                }
            })

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