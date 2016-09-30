class GenericElement extends DockbarElement() {
    constructor(params, document, router) {
        super(params.name, document)
        this._icon = params.icon
        this._router = router
    }

    _get_internal_element () {
        var image = this._document.createElement('i')

        image.className = "fa fa-" + this._icon +" fa-4x" 
        
        var self = this
        image.addEventListener('click', function() {
            self._router.send_message({ name: self.get_name() })
        })
    }

}