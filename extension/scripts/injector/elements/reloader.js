class Reloader extends DockbarElement {
    constructor(page_document) {
        super(page_document, 'reload')
    }

    _get_interal_element() {
        var image = this._document.createElement('i')
        image.className = "fa fa-refresh fa-4x" 

        image.addEventListener('click', function() {
            location.reload(true)
        })
    }
}