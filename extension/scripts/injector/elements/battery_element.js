class BatteryElement extends DockbarElement {
    constructor(page_document) {
        super(page_document, 'battery')

        this._battery_promise = this._get_battery_promise()
    }

    _get_battery_promise() {

        var battery=navigator.battery||navigator.webkitBattery||navigator.mozBattery;

        if(battery){
            return new Promise(function(resolve, reject){ resolve(battery); });
        }
        else if(navigator.getBattery){
            return navigator.getBattery();
        }

        return new Promise(function(resolve, reject) { reject({}); } );
    }

    _print_battery_percentage() {

        var self = this

        this._get_battery_promise().then(function(battery) {
            var level = (battery.level <= 1 ? battery.level : 1) * 100 / 20
            var level_rounded = Math.floor(level)
            level_rounded = level_rounded == 5 ? 4 : level_rounded

            self._element.className = 'fa fa-battery-'+level_rounded+' fa-4x'

            if(level_rounded==0){
                self._element.parentElement.className = 'low-battery'
            } else {
                self._element.parentElement.className = ''
            }

        });
    }



    _get_internal_element() {

        this._element = this._document.createElement('i')

        this._print_battery_percentage()

        var self = this

        setInterval(function(){
            self._print_battery_percentage()
        }, 60000)

        return this._element
    }
}