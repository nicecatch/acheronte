class NativeDispatcher extends BaseDispatcher {
    constructor(router) {
        super(router)
        this._elements_registered = []
    }
    
    check_validity(parameter) {
        return parameter && parameter.response && parameter.response.name && parameter.response.value && parameter.response.icon

    }
    resolve (parameter) {
        this._elements_registered.push(parameter.response)
        
        var mlc = MessageListenerCallbacks(
            parameter.response.name, // name

            function(response) { // from extension
                var msg = {
                    type: "execute_command",
                    tabId: response.tab.id,
                    text: parameter.response.value,
                    requestType: parameter.response.name
                }
                this.router.send_message(msg)
            }, 

            function (response) { // from native
                if(response) {
                    var msg = {
                        type: response.type,
                        tabId: response.tabId,
                        requestType: response.requestType,
                        response: response.response
                    }
                    chrome.tabs.sendMessage(response.tabId, msg);  
                }
            }
        )
        this._router.add_listener(mlc)
    }

    action_performed() {
        
    }
}