class BaseHandler {
    constructor(name, command){
        this._name = name
        this._command = command
    }

    get_command () {
        return this._command || ''
    }

    get_name() {
        return this._name || ''
    }

    set_params(params)  {
        this._params = params
    }

    get_params() {
        return this._params
    }

    callback_from_extension(params) {
        // override this
    }

    callback_from_native(params) {
        // override this
    }
}