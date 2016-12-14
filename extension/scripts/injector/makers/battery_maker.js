class BatteryMaker extends BaseMaker {
    constructor() {
        super('battery', false)

        this._battery_promise = this._get_battery_promise()
    }

    _get_battery_promise() {

        let battery=navigator.battery||navigator.webkitBattery||navigator.mozBattery;

        if(battery){
            return new Promise(function(resolve, reject){ resolve(battery); });
        }
        else if(navigator.getBattery){
            return navigator.getBattery();
        }

        return new Promise(function(resolve, reject) { reject({}); } );
    }

    _print_battery_percentage() {

        let self = this

        this._battery_promise.then(function(battery) {
            let level = (battery.level <= 1 ? battery.level : 1) * 100 / 20
            let level_rounded = Math.floor(level)
            level_rounded = level_rounded == 5 ? 4 : level_rounded

            self._image.className = 'fa fa-battery-'+level_rounded+' fa-2x image-container'

            if(level_rounded==0){
                self._element.parentElement.classList.add('low-battery')
            } else {
                self._element.parentElement.classList.remove('low-battery')
            }

            self._span.innerHTML =  Math.floor(battery.level * 100) + "<span class=\"percentage-symbol\">%</span>"
        });
    }



    _get_internal_element() {

        this._element = document.createElement('div')

        this._image = document.createElement('i')
        this._image.style.marginBottom = "4px"

        this._span = document.createElement('span')
        this._span.className = 'percentage-indicator'
        //this._span.style.fontSize = '2.5em'

        this._element.appendChild(this._image)
        this._element.appendChild(this._span)

        this._print_battery_percentage()

        let self = this

        setInterval(function(){
            self._print_battery_percentage()
        }, 60000)

        return this._element
    }
}