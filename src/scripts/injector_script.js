chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // Wifi Signal
    if(request && request.WiFi) {
        var battery_level = document.getElementById('wifi-icon')
        battery_level.innerText = request.WiFi.SignalStrength + '.'
    }
})

function getBatteryPromise() {
	var battery=navigator.battery||navigator.webkitBattery||navigator.mozBattery;

	if(battery){
		return new Promise(function(resolve, reject){ resolve(battery); });
	}
	else if(navigator.getBattery){
		return navigator.getBattery();
	}

	return new Promise(function(resolve, reject) { resolve({}); } );
}

function printBatteryPercentage() {

    var battery_level = document.getElementById('battery-icon')

    getBatteryPromise().then(function(battery) {
        var level = (battery.level <= 1 ? battery.level : 1) * 100 / 20
        var level_rouned = Math.round(level)
        level_rouned = level_rouned > level ? level : level_rouned
        // if rounded to superior unit decrease it
        level_rouned = level_rouned == 5 ? 4 : level_rouned
	    battery_level.innerHTML = '<i class="fa fa-battery-'+level_rouned+' fa-2x"></i>'
    });
}


function load_extension(){
    var div_dock = document.createElement('div')

    div_dock.id = "docker-bar"
    div_dock.innerHTML = this.responseText

    document.getElementsByTagName('body')[0].appendChild(div_dock)
    
    var refresher = document.getElementById('refresh-icon')
    refresher.addEventListener('click', function(){
        location.reload(true)
    })

    printBatteryPercentage()

    setInterval(function(){
        printBatteryPercentage()
    }, 60000)


}

(function(){
    var docker_html_address = chrome.extension.getURL('html/docker.html')
    var xhr = new XMLHttpRequest()

    xhr.onload = function() {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                load_extension.apply(xhr)
            } else {
                console.error(xhr.statusText);
            }
        }
    }

    xhr.open("GET", docker_html_address, true)
    xhr.send(null);
})();