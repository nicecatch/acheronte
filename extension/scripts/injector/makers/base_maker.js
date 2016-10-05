class BaseMaker {
    constructor(name, send_command){
        this._name = name
        this._send_command = send_command
        this._element = null
    }

    _get_internal_element() {
        // override this
        return null
    }


    handle_response (parameters) {
        // override this
    }

    _get_container() {
        if(!this._container) {
            this._container = document.createElement('div')
            this._container.id = this._name + 'container'
        }
        return this._container
    }

    create() {
        var button = this._get_container()
        button.appendChild(this._get_internal_element())
        return button
    }

    send_command () {
        return this._send_command || false
    }


    get_name() {
        return this._name || ''
    }
}