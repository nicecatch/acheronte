class DockbarElement {
    constructor(page_document, name) {
        this._name = name
        this._document = page_document

    }

    _get_internal_element() {
        // override this
        return null
    }

    get_name() {
        return this._name
    }

    create () {
        var button = this.get_container()
        button.appendChild(this._get_internal_element())
        return button
    }

    handle_response () {
        // override this
    }

    get_container () {
        if(!this._container) {
            this._container = this._document.createElement('div')
            this._container.id = this._name + 'container'
        }
        return this._container
    }
}