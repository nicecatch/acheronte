function load_extension(){
    var div_dock = document.createElement('div')

    div_dock.id = "docker-bar"
    div_dock.innerHTML = this.responseText

    document.getElementsByTagName('body')[0].appendChild(div_dock)
    
    var refresher = document.getElementById('refresh-icon')
    refresher.addEventListener('click', function(){
        location.reload(true)
    })
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