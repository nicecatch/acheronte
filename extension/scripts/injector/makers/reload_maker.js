class ReloadMaker extends BaseMaker {
    constructor() {
        super('reload', false)
    }

    _get_internal_element() {
        this._element = document.createElement('i')
        this._element.className = "fa fa-refresh fa-4x"

        this._element.addEventListener('click', function() {
            location.reload(true)
        })

        return this._element
    }

}