chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert(request);
  });

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
        var level_rounded = Math.floor(level)
        level_rounded = level_rounded == 5 ? 4 : level_rounded
        
	    battery_level.className = 'fa fa-battery-'+level_rounded+' fa-4x'

        if(level_rounded==0){
            battery_level.parentElement.className = 'low-battery'
        } else {
            battery_level.parentElement.className = ''
        }

    });
}


function load_extension(){
    var div_dock = document.createElement('div')

    div_dock.id = "docker-bar"
    div_dock.innerHTML = this.responseText

    document.getElementsByTagName('body')[0].appendChild(div_dock)
    
    var refresher = document.getElementById('refresh-container')
    refresher.addEventListener('click', function(){
        location.reload(true)
    })

    var panasonic = document.getElementById('panasonic-container')
    panasonic.addEventListener('click', function(){

        chrome.runtime.sendMessage({ recipient: "native", button_pressed: "panasonic"}, function(response) {
            // do nothing, native app will not send message in response
            //alert(response);
        });

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