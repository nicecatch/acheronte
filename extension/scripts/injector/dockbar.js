class Dockbar {
    constructor(page_document) {
        this._document = page_document

        this._create_dockbar()
    }

    _create_dockbar() {
        this._dockbar = this._document.createElement('div')
        this._dockbar.id = "dockbar"

        var page_body = this._document.getElementsByTagName('body')[0]

        if (page_body.firstChild) {
            page_body.insertBefore(this._dockbar, page_body.firstChild)
        }
        else {
            page_body.appendChild(this._dockbar)
        }
    }

    add_element(element) {
        this._dockbar.appendChild(element.draw_element())
    }
}