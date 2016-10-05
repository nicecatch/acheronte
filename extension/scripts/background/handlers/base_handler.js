class BaseHandler {
    constructor(name, command){
        this._name = name
        //this._position = parameters.position
        this._command = command
    }

    get_command () {
        return this._command || ''
    }

    get_name() {
        return this._name || ''
    }

    set_position(position) {
        this._position = position
    }
    get_position() {
        return this._position
    }

    set_extra_params(params)  {
        this._params = params
    }

    get_extra_params() {
        return this._params
    }


    callback_from_extension(params) {
        // override this
    }

    callback_from_native(params) {
        // override this
    }
}