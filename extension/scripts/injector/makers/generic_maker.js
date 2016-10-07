class GenericMaker extends BaseMaker {
    constructor(params) {
        super(params.name, true)
        this._icon = params.icon
        this._function = null
    }

    handle_response(parameters) {
        // not needed...
    }

    _get_internal_element () {
        this._element = document.createElement('i')

        this._element.className = "fa fa-" + this._icon +" fa-4x"

        this.register_listener()

        return this._element
    }

    register_listener() {
        this._element.addEventListener('click', this.function)
        this._element.classList.remove('tada')
    }

    get function() {
        if(!this._function) {
            var self = this
            this._function = function () {
                router.send_message({name: self.get_name()})
                self._element.classList.add('tada')
                self._element.removeEventListener('click', self.function)

                setTimeout(self.register_listener.bind(self), 3000)
            }
        }
        return this._function
    }

}