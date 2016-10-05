class LinkMaker extends BaseMaker {
    constructor() {
        super('link', false)
    }

    _get_internal_element(params) {
        this._url = params && params.extraParams ? params.extraParams.url : "/"
        this._icon = params && params.extraParams ? params.extraParams.icon : "home"

        this._element = document.createElement('i')
        this._element.className = "fa fa-" + this._icon + " fa-4x"

        var self = this

        this._element.addEventListener('click', function() {
            location.href = self._url
        })

        return this._element
    }

}