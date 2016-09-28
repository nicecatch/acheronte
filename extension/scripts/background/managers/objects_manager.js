class BaseManager{
    constructor(router){
        this.router = router
        this.router.add_listener(this.constructor.getRequestType(), this)
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
        this.router.send_message(this.constructor.get_request(opt))
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