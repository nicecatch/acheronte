class BaseDispatcher {
    constructor(router, document) {
        this._router = router
        this._document = document
    }

    resolve(parameters) {
        this.resolve_request(parameters)
    }
}
