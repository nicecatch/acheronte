class WifiMaker extends BaseMaker {
    constructor() {
        super('wifi', true)
    }

    _get_internal_element() {
        this._element = document.createElement('i')

        return this._element
    }

    handle_response(request) {
        var value = parseInt(request.signal)
        var class_name = 'wifi-'
        if(isNaN(value) || value == -1) {
            class_name += '0'
        }
        else {
            var level = Math.floor(value / 25) + 1
            level = level == 5 ? 4 : level
            class_name += level.toString()

            if(value <= 15) {
                class_name += '-red'
            }
        }
        this._element.className = class_name
    }
}