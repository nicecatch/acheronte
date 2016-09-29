class BaseManager{
    constructor(router){
        this.router = router
        var mlc = MessageListenerCallbacks(
            this.constructor.getRequestType(), 
            this, 
            callback_from_extension,
            callback_from_native)
         
        this.router.add_listener(mlc)
    }
    static _get_request(tab){
        var rqst = {
            tabId: tab,
            requestType: this.getRequestType(),
            text: this.getText()
        }
        return rqst;
    }

    send_message(opt){
        this.router.send_message(this.constructor._get_request(opt))
    }

    callback_from_extension() {
        // override this
    }

    callback_from_native() {
        // override this
    }

    static getRequestType() {
        // override this
        return 'request_type'
    }

    static getText () {
        // override this
        return 'text'
    }
}