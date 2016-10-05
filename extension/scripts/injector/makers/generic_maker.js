class GenericMaker extends BaseMaker {
    constructor(params) {
        super(params.name, true)
        this._icon = params.icon
    }

    handle_response(parameters) {
        // not needed...
    }

    _get_internal_element () {
        this._element = document.createElement('i')

        this._element.className = "fa fa-" + this._icon +" fa-4x"

        var self = this
        this._element.addEventListener('click', function() {
            router.send_message({ name: self.get_name() })
        })

        return this._element
    }
}