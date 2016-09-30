class ReloaderElement extends DockbarElement {
    constructor(page_document) {
        super(page_document, 'wifi')
    }

    _get_internal_element() {
        var image = this._document.createElement('i')
        image.className = "fa fa-refresh fa-4x" 

        image.addEventListener('click', function() {
            location.reload(true)
        })
    }
}