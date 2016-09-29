class Dockbar {
    constructor(page_document) {
        this._document = page_document

        this._create_dockbar()
    }

    _create_dockbar() {
        this._dockbar = this._document.createElement('div')
        this._dockbar.id = "dockbar"
        this._document.getElementsByTagName('body')[0].appendChild(div_dock)
    }

    append_child(child) {
        this._dockbar.appendChild(child)
    }
}

var dockbar = Dockbar(document)


