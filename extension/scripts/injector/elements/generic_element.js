class GenericElement extends DockbarElement {
    constructor(document, params) {
        super(document, params.name)
        this._icon = params.icon
    }

    _get_internal_element () {
        var image = this._document.createElement('i')

        image.className = "fa fa-" + this._icon +" fa-4x" 
        
        var self = this
        image.addEventListener('click', function() {
            router.send_message({ name: self.get_name() })
        })

        return image
    }
}