class BaseMaker {
    constructor(name, element_maker, send_command){
        this._name = name
        this._send_command = send_command
        this._element_maker = element_maker
    }

    create(page_document) {
        var maker = new this._element_maker(page_document)()
        return maker.create()
    }

    send_command () {
        return this._send_command || false
    }

    get_name() {
        return this._name || ''
    }
}