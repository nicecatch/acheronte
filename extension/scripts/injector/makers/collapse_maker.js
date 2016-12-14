class CollapseMaker extends BaseMaker {
    constructor() {
        super('collapse', false)
    }

    _get_internal_element() {

        this._element = document.createElement('i')
        this._element.className = "fa fa-plus-square fa-4x"

        let self = this
        let dBar = document.getElementById('dockbar')
        //this._element.addEventListener('click', function() {
        document.body.addEventListener('click', function(event) {
            if(event.target == self._element) {
                // If clicked on button do toggle action (close if opened, open if closed)
                self._element.classList.toggle('fa-minus-square')
                dBar.childNodes.forEach(function (elem) {
                    if (JSON.parse(elem.dataset.collapse)) {
                        elem.classList.toggle('hide-button')
                    }
                })
            }
            else if(event.path.indexOf(dBar) < 0) {
                // if clicked outside dockbar, force the dockbar to close
                self._element.classList.remove('fa-minus-square')

                dBar.childNodes.forEach(function (elem) {
                    if (JSON.parse(elem.dataset.collapse)) {
                        elem.classList.add('hide-button')
                    }
                })
            }
        })

        return this._element
    }


}