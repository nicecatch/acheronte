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
        var text_to_append = ''
        if(battery.dischargingTime == 'Infinity') {
            text_to_append = 'No Battery'
        } else {
            text_to_append = battery.level * 100 + '%';
        }   
        
	    battery_level.innerText = text_to_append
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