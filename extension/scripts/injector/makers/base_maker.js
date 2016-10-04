class BaseMaker {
    constructor(name, element, send_command){
        this._name = name
        this._send_command = send_command
        this._element = element
    }

    create(page_document) {
        var element = new (this._element)(page_document)
        return element.create()
    }

    send_command () {
        return this._send_command || false
    }

    get_name() {
        return this._name || ''
    }
}