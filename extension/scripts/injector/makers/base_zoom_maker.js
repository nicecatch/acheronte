class BaseZoomMaker extends BaseMaker {
    constructor(zoom) {

        super('zoom_' + zoom, true)
        this._zoom = zoom
    }

    _get_internal_element(params) {
        this._element = document.createElement('i')
        this._element.className = "fa fa-search-" + this._zoom + " fa-4x"


        let self = this
        this._element.addEventListener('click', function() {
            router.send_message({name: self.get_name() })
        })

        return this._element
    }
}