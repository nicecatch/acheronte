class BaseDispatcher {
    constructor(router) {
        this._router = router
    }

    check_validity(paramter) {
        //override this
        return false
    }

    resolve(parameters) {
        if(this.check_validity(parameters)) {
            this.resolve_request(parameters)
        }
    }
    
    get_config() {
        // override this
    }
}