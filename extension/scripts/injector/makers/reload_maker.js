class ReloadMaker extends BaseMaker {
    constructor() {
        super('reload', false)
    }

    _get_internal_element(params) {
        this._element = document.createElement('i')
        this._element.className = "fa fa-refresh fa-4x"


        var self = this
        this._element.addEventListener('click', function() {
            self._element.classList.add('spin')
            location.reload(true)
        })

        return this._element
    }

}