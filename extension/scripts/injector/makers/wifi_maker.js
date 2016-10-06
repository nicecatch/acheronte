class WifiMaker extends BaseMaker {
    constructor() {
        super('wifi', true)
    }

    _get_internal_element() {
        this._element = document.createElement('div')

        this._image = document.createElement('i')
        this._image.style.display = 'block'

        this._span = document.createElement('span')
        this._span.style.fontWeight = 'bolder'
        this._span.style.fontSize = '2.5em'

        this._element.appendChild(this._image)
        this._element.appendChild(this._span)



        // ask to be added to watch list
        chrome.runtime.sendMessage({name:"wifi"}, function(response) {
        })
        return this._element
    }

    handle_response(params) {
        var value = parseInt(params.request.signal)
        var class_name = 'wifi-'
        if(isNaN(value) || value == -1) {
            class_name += '0'
            this._span.innerText =  '-'
        }
        else {
            var level = Math.floor(value / 25) + 1
            level = level == 5 ? 4 : level
            class_name += level.toString()

            if(value <= 15) {
                class_name += '-red'
            }
            this._span.innerText =  value + "%"
        }
        this._image.className = class_name

    }
}