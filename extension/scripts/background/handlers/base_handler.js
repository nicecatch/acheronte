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

    set_position(position) {
        this._position = position
    }
    get_position() {
        return this._position
    }

    set_hide(hide) {
        this._hide = hide
    }

    get_hide() {
        return this._hide
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