class HostnameMaker extends BaseMaker {
    constructor() {
        super('hostname', false)
    }

    _get_internal_element(params) {
        this._element = document.createElement('span')

        this._element.className = 'hostname-indicator'

        router.send_message({name: 'hostname'})

        return this._element
    }

    handle_response(params) {
        var value = params.request.hostname

        this._element.innerText = value
    }
}