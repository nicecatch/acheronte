class BaseMaker {
    constructor(name, element, send_command){
        this._name = name
        this._send_command = send_command
        this._element = element
    }

    create(page_document) {
        var element = this._initialize_element(page_document)
        return element.create()
    }

    send_command () {
        return this._send_command || false
    }

    handle_response (parameters) {
        // override this
    }

    _initialize_element(page_document){
        return new (this._element)(page_document)
    }


    get_name() {
        return this._name || ''
    }
}