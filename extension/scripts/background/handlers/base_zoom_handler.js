ZOOM_LEVELS = [0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2]

class BaseZoomHandler extends BaseHandler {
    constructor(zoom) {
        super('zoom_'+zoom, '')
        this._zoom = zoom
    }

    callback_from_extension(params) {

        let tabId = params.sender.tab.id
        let self = this
        chrome.tabs.getZoom(tabId, function(zoomFactor) {
            chrome.tabs.setZoom(tabId, self._get_next_zoom(zoomFactor))
        })
    }

    _get_next_zoom(zoomFactor)
    {
        let i = ZOOM_LEVELS.indexOf(zoomFactor)

        if(i<0) // default ?
        {
            return 1
            //return ZOOM_LEVELS[Math.floor(ZOOM_LEVELS.length/2)] // default?
        }


        i = this._zoom == 'plus' ? i + 1 : i - 1

        if(i<0)
            return ZOOM_LEVELS[0]

        if(i>=ZOOM_LEVELS.length)
            return ZOOM_LEVELS[ZOOM_LEVELS.length-1]

        return ZOOM_LEVELS[i]
    }

    callback_from_native(params) {
        // No need?
    }
}