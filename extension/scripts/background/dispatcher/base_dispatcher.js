class BaseDispatcher {
    constructor(router) {
        this._router = router
    }

    check_validity(paramter) {
        //override this
        return false
    }

    resolve(parameters) {
        // override this
    }
}