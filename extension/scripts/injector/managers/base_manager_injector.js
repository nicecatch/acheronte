class BaseManager{
    constructor(router){
        this._router = router
        var mlc = new MessageListenerCallbacks(
            this.constructor.getRequestType(),
            this,
            this.callback_from_background)
         
        this._router.add_listener(mlc)
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